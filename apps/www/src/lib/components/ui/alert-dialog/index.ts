import {
	createDialog,
	type CreateDialogProps,
	type Dialog,
	melt
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { default as Root } from "./AlertDialog.svelte";
import { default as Action } from "./AlertDialogAction.svelte";
import { default as Cancel } from "./AlertDialogCancel.svelte";
import { default as Content } from "./AlertDialogContent.svelte";
import { default as Description } from "./AlertDialogDescription.svelte";
import { default as Footer } from "./AlertDialogFooter.svelte";
import { default as Header } from "./AlertDialogHeader.svelte";
import { default as Overlay } from "./AlertDialogOverlay.svelte";
import { default as Portal } from "./AlertDialogPortal.svelte";
import { default as Title } from "./AlertDialogTitle.svelte";
import { default as Trigger } from "./AlertDialogTrigger.svelte";

const NAME = "alertDialog";

function set(props: CreateDialogProps) {
	const alertDialog = createDialog({ ...props });
	setContext(NAME, alertDialog);
	const {
		elements: { trigger }
	} = alertDialog;

	return trigger;
}

function get() {
	return getContext<Dialog>(NAME);
}

export const ctx = {
	set: set,
	get: get,
	getClose: () => get().elements.close,
	getContent: () => get().elements.content,
	getOverlay: () => get().elements.overlay,
	getPortal,
	getTitle: () => get().elements.title,
	getDescription: () => get().elements.description,
	getTrigger: () => get().elements.trigger
};

function getPortal() {
	const {
		elements: { portalled },
		states: { open }
	} = get();

	return {
		portal: portalled,
		open
	};
}

export const AlertDialog = Object.assign(Root, {
	Action,
	Cancel,
	Content,
	Description,
	Footer,
	Header,
	Overlay,
	Portal,
	Title,
	Trigger
});

export { Root as AlertDialogRoot };
export { Action as AlertDialogAction };
export { Cancel as AlertDialogCancel };
export { Content as AlertDialogContent };
export { Description as AlertDialogDescription };
export { Footer as AlertDialogFooter };
export { Header as AlertDialogHeader };
export { Overlay as AlertDialogOverlay };
export { Portal as AlertDialogPortal };
export { Title as AlertDialogTitle };
export { Trigger as AlertDialogTrigger };

export type { CreateDialogProps as CreateAlertDialogProps } from "@melt-ui/svelte";

export { melt };
