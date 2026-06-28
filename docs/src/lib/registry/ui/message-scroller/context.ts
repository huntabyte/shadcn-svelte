import type { MessageScrollerController } from "./message-scroller-controller.js";

export const MESSAGE_SCROLLER_CONTEXT = Symbol("message-scroller");

export type MessageScrollerContextValue = MessageScrollerController;
