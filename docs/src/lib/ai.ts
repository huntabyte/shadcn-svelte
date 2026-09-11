export type DemoMessagePart = {
	type: "text" | "reasoning";
	text: string;
};

export type DemoMessage = {
	id: string;
	role: "user" | "assistant";
	parts: DemoMessagePart[];
	text?: string;
};

type ScriptedTurn =
	| { kind: "user" | "assistant"; id: string; text: string; delayMs: number }
	| { kind: "sleep"; delayMs: number };

export function getMessageText(message: Pick<DemoMessage, "parts"> | { text?: string; parts?: DemoMessagePart[] }) {
	if (message.parts?.length) {
		return message.parts.reduce((text, part) => (part.type === "text" ? text + part.text : text), "");
	}

	return typeof message.text === "string" ? message.text : "";
}

function toMessage(turn: Extract<ScriptedTurn, { kind: "user" | "assistant" }>): DemoMessage {
	return {
		id: turn.id,
		role: turn.kind,
		parts: [{ type: "text", text: turn.text }],
	};
}

export function createChat() {
	const turns: ScriptedTurn[] = [];
	let pendingDelay = 0;
	let nextId = 0;

	const chat = {
		user(text = "", options?: { id?: string }) {
			turns.push({
				kind: "user",
				id: options?.id ?? `msg-${++nextId}`,
				text,
				delayMs: 0,
			});
			return chat;
		},
		assistant(text = "") {
			turns.push({
				kind: "assistant",
				id: `msg-${++nextId}`,
				text,
				delayMs: pendingDelay,
			});
			pendingDelay = 0;
			return chat;
		},
		sleep(delayMs: number) {
			pendingDelay = delayMs;
			return chat;
		},
		get(count?: number) {
			const messages = turns
				.filter((turn): turn is Extract<ScriptedTurn, { kind: "user" | "assistant" }> => turn.kind !== "sleep")
				.map(toMessage);
			return count === undefined ? messages.map(cloneMessage) : messages.slice(0, count).map(cloneMessage);
		},
		next(messages: readonly DemoMessage[]) {
			const ids = new Set(messages.map((message) => message.id));
			const texts = new Set(messages.map((message) => `${message.role}:${getMessageText(message)}`));
			const scripted = turns.filter(
				(turn): turn is Extract<ScriptedTurn, { kind: "user" | "assistant" }> => turn.kind !== "sleep"
			);

			for (const turn of scripted) {
				if (turn.kind !== "user") continue;
				if (ids.has(turn.id) || texts.has(`user:${turn.text}`)) continue;
				return cloneMessage(toMessage(turn));
			}

			return null;
		},
		transport(options?: { delayMs?: number }) {
			return {
				delayMs: options?.delayMs ?? 50,
				getAssistantAfter(userMessage: DemoMessage) {
					const scripted = turns.filter(
						(turn): turn is Extract<ScriptedTurn, { kind: "user" | "assistant" }> =>
							turn.kind !== "sleep"
					);
					const userIndex = scripted.findIndex(
						(turn) =>
							turn.kind === "user" &&
							(turn.id === userMessage.id || turn.text === getMessageText(userMessage))
					);
					if (userIndex < 0) return null;
					const next = scripted[userIndex + 1];
					return next?.kind === "assistant" ? next : null;
				},
			};
		},
	};

	return chat;
}

export function cloneMessage(message: DemoMessage): DemoMessage {
	return {
		id: message.id,
		role: message.role,
		parts: message.parts.map((part) => ({ ...part })),
		text: message.text,
	};
}

export async function wait(delayMs: number) {
	if (delayMs <= 0) return;
	await new Promise((resolve) => setTimeout(resolve, delayMs));
}

/** Splits text into word-plus-whitespace deltas for streaming. */
export function splitTextDeltas(text: string) {
	return text.match(/\S+\s*/g) ?? [text];
}
