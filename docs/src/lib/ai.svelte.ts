import { cloneMessage, createChat, splitTextDeltas, wait, type DemoMessage } from "./ai.js";

export function createScriptedChat(options: {
	chat: ReturnType<typeof createChat>;
	transport: ReturnType<ReturnType<typeof createChat>["transport"]>;
	initialMessages?: DemoMessage[];
}) {
	let messages = $state(options.initialMessages?.map(cloneMessage) ?? []);
	let status = $state<"ready" | "submitted" | "streaming">("ready");

	async function sendMessage(userMessage: DemoMessage) {
		if (status !== "ready") return;

		messages = [...messages, cloneMessage(userMessage)];
		status = "submitted";

		const assistantTurn = options.transport.getAssistantAfter(userMessage);
		if (!assistantTurn) {
			status = "ready";
			return;
		}

		await wait(assistantTurn.delayMs);
		status = "streaming";

		const assistant: DemoMessage = {
			id: assistantTurn.id,
			role: "assistant",
			parts: [{ type: "text", text: "" }],
		};
		messages = [...messages, assistant];

		const delayMs = options.transport.delayMs ?? 20;
		let text = "";
		for (const delta of splitTextDeltas(assistantTurn.text)) {
			if (delayMs) {
				await wait(delayMs);
			}
			text += delta;
			const currentText = text;
			messages = messages.map((message) =>
				message.id === assistant.id
					? { ...message, parts: [{ type: "text", text: currentText }] }
					: message
			);
		}

		status = "ready";
	}

	function setMessages(next: DemoMessage[]) {
		messages = next.map(cloneMessage);
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
	};
}
