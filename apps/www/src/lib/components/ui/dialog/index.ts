import {
	createDialog,
	type CreateDialogProps,
	type Dialog as DialogReturn,
	melt
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
export { melt };

import { default as Root } from "./Dialog.svelte";
import { default as Content } from "./DialogContent.svelte";
import { default as Description } from "./DialogDescription.svelte";
import { default as Footer } from "./DialogFooter.svelte";
import { default as Header } from "./DialogHeader.svelte";
import { default as Overlay } from "./DialogOverlay.svelte";
import { default as Portal } from "./DialogPortal.svelte";
import { default as Title } from "./DialogTitle.svelte";
import { default as Trigger } from "./DialogTrigger.svelte";

export const Dialog = Object.assign(Root, {
	Content,
	Description,
	Footer,
	Header,
	Overlay,
	Portal,
	Title,
	Trigger
});

export { Root as DialogRoot };
export { Content as DialogContent };
export { Description as DialogDescription };
export { Footer as DialogFooter };
export { Header as DialogHeader };
export { Overlay as DialogOverlay };
export { Portal as DialogPortal };
export { Title as DialogTitle };
export { Trigger as DialogTrigger };

export type { CreateDialogProps as CreateDialogProps } from "@melt-ui/svelte";

export const ctx = {
	set,
	get,
	getClose: () => get().elements.close,
	getContent: () => get().elements.content,
	getOverlay: () => get().elements.overlay,
	getPortal,
	getTitle: () => get().elements.title,
	getDescription: () => get().elements.description,
	getTrigger: () => get().elements.trigger
};

const NAME = "Dialog";

function set(props: CreateDialogProps) {
	const Dialog = createDialog({ ...props });
	setContext(NAME, Dialog);
	const {
		elements: { trigger }
	} = Dialog;

	return trigger;
}

function get() {
	return getContext<DialogReturn>(NAME);
}

function getPortal() {
	const {
		elements: { portalled },
		states: { open }
	} = get();
	return { portal: portalled, open };
}
