type TextUIPart = {
	type: "text";
	text: string;
	state?: "streaming" | "done";
};

type DemoMessage = {
	id: string;
	role: "user" | "assistant";
	parts: TextUIPart[];
};

type ChatTurn = {
	delayMs: number;
	message: DemoMessage;
	role: DemoMessage["role"];
};

type ChatGetOptions = {
	count?: number;
};

type ChatNextOptions = {
	after?: DemoMessage[];
};

type ChatTransportOptions = {
	chunkDelayMs?: number;
};

type ChatTransport = {
	streamMessage: (options: {
		abortSignal?: AbortSignal;
		messageId?: string;
		messages: DemoMessage[];
	}) => Promise<{
		message: DemoMessage;
		deltas: AsyncGenerator<string>;
	}>;
};

type UseChatOptions = {
	messages: DemoMessage[];
	transport: ChatTransport;
};

const DEFAULT_CHUNK_DELAY_MS = 50;

function wait(delayMs: number, abortSignal?: AbortSignal) {
	return new Promise<void>((resolve, reject) => {
		if (abortSignal?.aborted) {
			reject(abortSignal.reason);
			return;
		}

		const timeout = setTimeout(resolve, delayMs);

		abortSignal?.addEventListener(
			"abort",
			() => {
				clearTimeout(timeout);
				reject(abortSignal.reason);
			},
			{ once: true }
		);
	});
}

function splitTextDeltas(text: string) {
	return text.match(/\S+\s*/g) ?? [text];
}

function cloneMessage(message: DemoMessage): DemoMessage {
	return {
		...message,
		parts: message.parts.map((part) => ({ ...part })),
	};
}

function createTextMessage(id: string, role: DemoMessage["role"], text: string): DemoMessage {
	return {
		id,
		role,
		parts: [
			{
				type: "text",
				text,
			},
		],
	};
}

export function getMessageText(message: Pick<DemoMessage, "parts">) {
	return message.parts
		.filter((part): part is TextUIPart => part.type === "text")
		.map((part) => part.text)
		.join("");
}

export function createChat() {
	const turns: ChatTurn[] = [];
	let cursor = 0;
	let messageIndex = 0;
	let pendingDelayMs = 0;

	function nextMessageId() {
		messageIndex += 1;
		return `msg-${messageIndex}`;
	}

	function pushTurn(role: DemoMessage["role"], text: string) {
		turns.push({
			delayMs: pendingDelayMs,
			message: createTextMessage(nextMessageId(), role, text),
			role,
		});
		pendingDelayMs = 0;

		return api;
	}

	function findLatestScriptedIndex(messages: DemoMessage[]) {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const messageIds = new Set(messages.map((message) => message.id));
		let latestScriptedIndex = -1;

		for (let index = 0; index < turns.length; index++) {
			if (messageIds.has(turns[index].message.id)) {
				latestScriptedIndex = index;
			}
		}

		if (latestScriptedIndex === -1) {
			const lastMessage = messages[messages.length - 1];
			latestScriptedIndex = turns.findIndex(
				(turn) =>
					turn.message.role === lastMessage?.role &&
					getMessageText(turn.message) === getMessageText(lastMessage)
			);
		}

		return latestScriptedIndex;
	}

	function findNextAssistantTurn(messages: DemoMessage[], messageId?: string) {
		if (messageId) {
			const index = turns.findIndex((turn) => turn.message.id === messageId);
			const turn = turns[index];

			if (turn?.role === "assistant") {
				return turn;
			}

			return turns.slice(index + 1).find((nextTurn) => nextTurn.role === "assistant");
		}

		const latestScriptedIndex = findLatestScriptedIndex(messages);

		return turns.slice(latestScriptedIndex + 1).find((turn) => turn.role === "assistant");
	}

	function findNextUserTurn(messages: DemoMessage[]) {
		const latestScriptedIndex = findLatestScriptedIndex(messages);

		return turns.slice(latestScriptedIndex + 1).find((turn) => turn.role === "user");
	}

	const api = {
		user(text: string) {
			return pushTurn("user", text);
		},

		sleep(delayMs: number) {
			pendingDelayMs += delayMs;
			return api;
		},

		assistant(text: string) {
			return pushTurn("assistant", text);
		},

		get(options: ChatGetOptions = {}) {
			const count = options.count ?? turns.length;
			cursor = Math.max(cursor, count);

			return turns.slice(0, count).map((turn) => cloneMessage(turn.message));
		},

		next(options: ChatNextOptions = {}) {
			if (options.after) {
				const turn = findNextUserTurn(options.after);
				return turn ? cloneMessage(turn.message) : null;
			}

			const index = turns.findIndex(
				(turn, turnIndex) => turnIndex >= cursor && turn.role === "user"
			);

			if (index === -1) {
				return null;
			}

			cursor = index + 1;
			return cloneMessage(turns[index].message);
		},

		transport(options: ChatTransportOptions = {}): ChatTransport {
			return {
				async streamMessage({ abortSignal, messageId, messages }) {
					const turn = findNextAssistantTurn(messages, messageId);

					if (!turn) {
						throw new Error("No scripted assistant message found.");
					}

					if (turn.delayMs) {
						await wait(turn.delayMs, abortSignal);
					}

					const chunkDelayMs = options.chunkDelayMs ?? DEFAULT_CHUNK_DELAY_MS;
					const text = getMessageText(turn.message);

					async function* deltas() {
						for (const delta of splitTextDeltas(text)) {
							if (chunkDelayMs) {
								await wait(chunkDelayMs, abortSignal);
							}

							yield delta;
						}
					}

					return {
						message: cloneMessage(turn.message),
						deltas: deltas(),
					};
				},
			};
		},
	};

	return api;
}

export function useChat(options: UseChatOptions) {
	let messages = $state(options.messages.map(cloneMessage));
	let status = $state<"ready" | "submitted" | "streaming">("ready");
	let abortController: AbortController | null = null;

	function setMessages(nextMessages: DemoMessage[]) {
		abortController?.abort();
		abortController = null;
		messages = nextMessages.map(cloneMessage);
		status = "ready";
	}

	async function sendMessage(message: DemoMessage) {
		if (status === "submitted" || status === "streaming") return;

		abortController?.abort();
		abortController = new AbortController();

		const nextMessages = [...messages, cloneMessage(message)];
		messages = nextMessages;
		status = "submitted";

		try {
			const response = await options.transport.streamMessage({
				abortSignal: abortController.signal,
				messageId: message.id,
				messages: nextMessages,
			});
			const assistantMessage: DemoMessage = {
				...response.message,
				parts: response.message.parts.map((part) =>
					part.type === "text" ? { ...part, state: "streaming" as const, text: "" } : part
				),
			};

			messages = [...messages, assistantMessage];
			status = "streaming";

			for await (const delta of response.deltas) {
				messages = messages.map((currentMessage) =>
					currentMessage.id === assistantMessage.id
						? {
								...currentMessage,
								parts: currentMessage.parts.map((part) =>
									part.type === "text"
										? { ...part, text: `${part.text}${delta}` }
										: part
								),
							}
						: currentMessage
				);
			}

			messages = messages.map((currentMessage) =>
				currentMessage.id === assistantMessage.id
					? {
							...currentMessage,
							parts: currentMessage.parts.map((part) =>
								part.type === "text" ? { ...part, state: "done" } : part
							),
						}
					: currentMessage
			);
			status = "ready";
		} catch (error) {
			if (!abortController.signal.aborted) {
				throw error;
			}
		}
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

export type { ChatTransport, DemoMessage };
