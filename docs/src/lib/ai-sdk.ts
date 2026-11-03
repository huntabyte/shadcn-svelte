// Scripted chats for the AI Elements examples. `createChat` builds a transcript
// and a transport that replays it, for `Chat` from `@ai-sdk/svelte`.
import type { UIMessage } from "ai";

export * from "@shadcn/helpers/ai-sdk";

export function getMessageText(message: Pick<UIMessage, "parts">) {
	return message.parts.reduce((text, part) => (part.type === "text" ? text + part.text : text), "");
}
