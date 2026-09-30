import {
	cloneMessage,
	createChat,
	isDemoMessage,
	splitTextDeltas,
	wait,
	type DemoMessage,
	type DemoMessagePart,
	type DemoToolPart,
} from "./ai.js";

function isToolPart(part: DemoMessagePart): part is DemoToolPart {
	return part.type === "dynamic-tool" || part.type.startsWith("tool-");
}

export function createScriptedChat(options: {
	chat: ReturnType<typeof createChat>;
	transport: ReturnType<ReturnType<typeof createChat>["transport"]>;
	initialMessages?: DemoMessage[];
}) {
	let messages = $state(options.initialMessages?.map(cloneMessage) ?? []);
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	let generation = 0;

	function patchAssistant(id: string, update: (parts: DemoMessagePart[]) => DemoMessagePart[]) {
		messages = messages.map((message) =>
			message.id === id
				? { ...message, parts: update(message.parts.map((part) => ({ ...part }))) }
				: message
		);
	}

	async function sendMessage(input: DemoMessage | { text: string }) {
		if (status !== "ready") return;
		const run = ++generation;

		const userMessage = isDemoMessage(input)
			? cloneMessage(input)
			: {
					id: `user-${Date.now()}`,
					role: "user" as const,
					parts: [{ type: "text" as const, text: input.text }],
				};
		messages = [...messages, userMessage];
		status = "submitted";

		const assistantTurn = options.transport.getAssistantAfter(userMessage);
		if (!assistantTurn) {
			status = "ready";
			return;
		}

		await wait(assistantTurn.delayMs);
		if (run !== generation) return;
		status = "streaming";

		const assistant: DemoMessage = {
			id: assistantTurn.id,
			role: "assistant",
			parts: [],
		};
		messages = [...messages, assistant];

		const delayMs = options.transport.delayMs ?? 20;

		for (const event of assistantTurn.events) {
			if (event.kind === "sleep") {
				await wait(event.delayMs);
				if (run !== generation) return;
				continue;
			}

			if (event.kind === "text" || event.kind === "reasoning") {
				const part: DemoMessagePart =
					event.kind === "text"
						? { type: "text", text: "" }
						: { type: "reasoning", text: "", state: "streaming" };
				patchAssistant(assistant.id, (parts) => [...parts, part]);
				const partIndex = messages.find((message) => message.id === assistant.id)!.parts.length - 1;
				let text = "";
				for (const delta of splitTextDeltas(event.text)) {
					if (delayMs) await wait(delayMs);
					if (run !== generation) return;
					text += delta;
					const currentText = text;
					patchAssistant(assistant.id, (parts) =>
						parts.map((current, index) =>
							index === partIndex
								? event.kind === "reasoning"
									? { type: "reasoning", text: currentText, state: "streaming" }
									: { type: "text", text: currentText }
								: current
						)
					);
				}
				if (event.kind === "reasoning") {
					patchAssistant(assistant.id, (parts) =>
						parts.map((current, index) =>
							index === partIndex ? { type: "reasoning", text, state: "done" } : current
						)
					);
				}
				continue;
			}

			if (event.kind === "tool-output") {
				patchAssistant(assistant.id, (parts) =>
					parts.map((part) => {
						if (!isToolPart(part) || part.toolCallId !== event.toolCallId) {
							return part;
						}

						return { ...part, output: event.output, state: "output-available" };
					})
				);
				continue;
			}

			if (event.kind === "file") {
				patchAssistant(assistant.id, (parts) => [
					...parts,
					{
						type: "file",
						filename: event.filename,
						mediaType: event.mediaType,
						url: event.url,
					},
				]);
				continue;
			}

			if (event.kind === "source-url") {
				patchAssistant(assistant.id, (parts) => [
					...parts,
					{
						type: "source-url",
						sourceId: event.sourceId,
						title: event.title,
						url: event.url,
					},
				]);
				continue;
			}

			if (event.kind === "source-document") {
				patchAssistant(assistant.id, (parts) => [
					...parts,
					{
						type: "source-document",
						sourceId: event.sourceId,
						title: event.title,
						filename: event.filename,
						mediaType: event.mediaType,
					},
				]);
				continue;
			}

			patchAssistant(assistant.id, (parts) => [
				...parts,
				{
					type: `tool-${event.name}`,
					toolName: event.name,
					toolCallId: event.toolCallId,
					title: event.title,
					state: "input-available",
					input: event.input,
				},
			]);
		}

		status = "ready";
	}

	function setMessages(next: DemoMessage[] | ((current: DemoMessage[]) => DemoMessage[])) {
		messages = (typeof next === "function" ? next(messages) : next).map(cloneMessage);
		status = "ready";
	}

	return {
		get messages() {
			return messages;
		},
		get status() {
			return status;
		},
		sendMessage,
		setMessages,
		stop() {
			generation += 1;
			status = "ready";
		},
	};
}
