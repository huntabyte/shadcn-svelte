import {
	createDialog,
	type CreateDialogProps,
	type Dialog as DialogReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

import Root from "./Dialog.svelte";
import Content from "./DialogContent.svelte";
import Description from "./DialogDescription.svelte";
import Footer from "./DialogFooter.svelte";
import Header from "./DialogHeader.svelte";
import Overlay from "./DialogOverlay.svelte";
import Portal from "./DialogPortal.svelte";
import Title from "./DialogTitle.svelte";
import Trigger from "./DialogTrigger.svelte";

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
export {
	melt,
	type CreateDialogProps as CreateDialogProps
} from "@melt-ui/svelte";

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

export {
	Root as DialogRoot,
	Content as DialogContent,
	Description as DialogDescription,
	Footer as DialogFooter,
	Header as DialogHeader,
	Overlay as DialogOverlay,
	Portal as DialogPortal,
	Title as DialogTitle,
	Trigger as DialogTrigger
};
