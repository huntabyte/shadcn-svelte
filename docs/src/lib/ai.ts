export type DemoFilePart = {
	type: "file";
	filename: string;
	mediaType: string;
	url: string;
};

export type DemoSourceUrlPart = {
	type: "source-url";
	sourceId: string;
	title?: string;
	url: string;
};

export type DemoSourceDocumentPart = {
	type: "source-document";
	sourceId: string;
	title?: string;
	filename?: string;
	mediaType?: string;
};

export type DemoToolPart = {
	type: `tool-${string}` | "dynamic-tool";
	toolName?: string;
	toolCallId: string;
	title?: string;
	state: string;
	input?: unknown;
	output?: unknown;
	errorText?: string;
};

export type DemoMessagePart =
	| { type: "text"; text: string }
	| { type: "reasoning"; text: string; state?: "streaming" | "done" }
	| DemoFilePart
	| DemoSourceUrlPart
	| DemoSourceDocumentPart
	| DemoToolPart;

export type DemoMessage = {
	id: string;
	role: "user" | "assistant";
	parts: DemoMessagePart[];
	text?: string;
	metadata?: { name?: string };
};

type AssistantEvent =
	| { kind: "sleep"; delayMs: number }
	| { kind: "text"; text: string }
	| { kind: "reasoning"; text: string }
	| { kind: "file"; filename: string; mediaType: string; url: string }
	| { kind: "source-url"; sourceId: string; title?: string; url: string }
	| {
			kind: "source-document";
			sourceId: string;
			title?: string;
			filename?: string;
			mediaType?: string;
	  }
	| {
			kind: "tool-input";
			name: string;
			toolCallId: string;
			title?: string;
			input?: unknown;
	  }
	| { kind: "tool-output"; toolCallId: string; output: unknown };

type ScriptedTurn =
	| {
			kind: "user";
			id: string;
			text: string;
			delayMs: number;
			metadata?: { name?: string };
			files?: Array<{ filename: string; mediaType: string; url: string }>;
	  }
	| { kind: "assistant"; id: string; delayMs: number; events: AssistantEvent[] }
	| { kind: "sleep"; delayMs: number };

type ToolHandle<OUTPUT> = {
	sleep(delayMs: number): ToolHandle<OUTPUT>;
	output(output: OUTPUT): ToolHandle<OUTPUT>;
};

type EventWriter = {
	text(text: string): EventWriter;
	reasoning(text: string): EventWriter;
	sleep(delayMs: number): EventWriter;
	file(part: { filename: string; mediaType: string; url: string }): EventWriter;
	sourceUrl(part: { sourceId: string; title?: string; url: string }): EventWriter;
	sourceDocument(part: {
		sourceId: string;
		title?: string;
		filename?: string;
		mediaType?: string;
	}): EventWriter;
	tool<OUTPUT = unknown>(
		name: string,
		options?: { title?: string; input?: unknown }
	): ToolHandle<OUTPUT>;
};

export type AssistantTurn = Extract<ScriptedTurn, { kind: "assistant" }>;

export function getMessageText(
	message: Pick<DemoMessage, "parts" | "text"> | { text?: string; parts?: DemoMessagePart[] }
) {
	if (message.parts?.length) {
		return message.parts.reduce(
			(text, part) => (part.type === "text" ? text + part.text : text),
			""
		);
	}

	return typeof message.text === "string" ? message.text : "";
}

export function isDemoMessage(value: DemoMessage | { text: string }): value is DemoMessage {
	return "id" in value && "role" in value && "parts" in value;
}

function toUserMessage(turn: Extract<ScriptedTurn, { kind: "user" }>): DemoMessage {
	const parts: DemoMessagePart[] = [{ type: "text", text: turn.text }];
	for (const file of turn.files ?? []) {
		parts.push({ type: "file", ...file });
	}

	return {
		id: turn.id,
		role: "user",
		parts,
		metadata: turn.metadata,
	};
}

function eventToPart(event: AssistantEvent): DemoMessagePart | null {
	if (event.kind === "sleep" || event.kind === "tool-output") return null;
	if (event.kind === "text") return { type: "text", text: event.text };
	if (event.kind === "reasoning") return { type: "reasoning", text: event.text, state: "done" };
	if (event.kind === "file") {
		return {
			type: "file",
			filename: event.filename,
			mediaType: event.mediaType,
			url: event.url,
		};
	}
	if (event.kind === "source-url") {
		return {
			type: "source-url",
			sourceId: event.sourceId,
			title: event.title,
			url: event.url,
		};
	}
	if (event.kind === "source-document") {
		return {
			type: "source-document",
			sourceId: event.sourceId,
			title: event.title,
			filename: event.filename,
			mediaType: event.mediaType,
		};
	}

	return {
		type: `tool-${event.name}`,
		toolName: event.name,
		toolCallId: event.toolCallId,
		title: event.title,
		state: "input-available",
		input: event.input,
	};
}

function toAssistantMessage(turn: AssistantTurn): DemoMessage {
	const parts: DemoMessagePart[] = [];

	for (const event of turn.events) {
		if (event.kind === "tool-output") {
			const toolPart = parts.find(
				(part): part is DemoToolPart =>
					(part.type === "dynamic-tool" || part.type.startsWith("tool-")) &&
					"toolCallId" in part &&
					part.toolCallId === event.toolCallId
			);
			if (toolPart) {
				toolPart.output = event.output;
				toolPart.state = "output-available";
			}
			continue;
		}

		const part = eventToPart(event);
		if (part) parts.push(part);
	}

	return {
		id: turn.id,
		role: "assistant",
		parts,
	};
}

function toMessage(turn: Extract<ScriptedTurn, { kind: "user" | "assistant" }>): DemoMessage {
	return turn.kind === "user" ? toUserMessage(turn) : toAssistantMessage(turn);
}

function createWriter(events: AssistantEvent[]): EventWriter {
	let toolCallCount = 0;

	const writer: EventWriter = {
		text(text) {
			events.push({ kind: "text", text });
			return writer;
		},
		reasoning(text) {
			events.push({ kind: "reasoning", text });
			return writer;
		},
		sleep(delayMs) {
			events.push({ kind: "sleep", delayMs });
			return writer;
		},
		file(part) {
			events.push({ kind: "file", ...part });
			return writer;
		},
		sourceUrl(part) {
			events.push({ kind: "source-url", ...part });
			return writer;
		},
		sourceDocument(part) {
			events.push({ kind: "source-document", ...part });
			return writer;
		},
		tool(name, options = {}) {
			const toolCallId = `tool-${++toolCallCount}`;
			events.push({
				kind: "tool-input",
				name,
				toolCallId,
				title: options.title,
				input: options.input,
			});

			const handle: ToolHandle<unknown> = {
				sleep(delayMs) {
					events.push({ kind: "sleep", delayMs });
					return handle;
				},
				output(output) {
					events.push({ kind: "tool-output", toolCallId, output });
					return handle;
				},
			};

			return handle as ToolHandle<never>;
		},
	};

	return writer;
}

export function createChat() {
	const turns: ScriptedTurn[] = [];
	let pendingDelay = 0;
	let nextId = 0;

	const chat = {
		user(
			text = "",
			options?: {
				id?: string;
				metadata?: { name?: string };
				files?: Array<{ filename: string; mediaType: string; url: string }>;
			}
		) {
			turns.push({
				kind: "user",
				id: options?.id ?? `msg-${++nextId}`,
				text,
				delayMs: 0,
				metadata: options?.metadata,
				files: options?.files,
			});
			return chat;
		},
		assistant(input: string | ((context: { writer: EventWriter }) => void) = "") {
			const events: AssistantEvent[] = [];
			if (typeof input === "function") {
				input({ writer: createWriter(events) });
			} else {
				events.push({ kind: "text", text: input });
			}

			turns.push({
				kind: "assistant",
				id: `msg-${++nextId}`,
				delayMs: pendingDelay,
				events,
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
				.filter(
					(turn): turn is Extract<ScriptedTurn, { kind: "user" | "assistant" }> =>
						turn.kind !== "sleep"
				)
				.map(toMessage);
			return count === undefined
				? messages.map(cloneMessage)
				: messages.slice(0, count).map(cloneMessage);
		},
		next(messages: readonly DemoMessage[]) {
			const ids = new Set(messages.map((message) => message.id));
			const texts = new Set(
				messages.map((message) => `${message.role}:${getMessageText(message)}`)
			);
			const scripted = turns.filter(
				(turn): turn is Extract<ScriptedTurn, { kind: "user" | "assistant" }> =>
					turn.kind !== "sleep"
			);

			for (const turn of scripted) {
				if (turn.kind !== "user") continue;
				if (ids.has(turn.id) || texts.has(`user:${turn.text}`)) continue;
				return cloneMessage(toUserMessage(turn));
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
		metadata: message.metadata ? { ...message.metadata } : undefined,
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
