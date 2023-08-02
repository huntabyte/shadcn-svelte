import {
	createDialog,
	type CreateDialogProps,
	type Dialog
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

export const AlertDialog = Object.assign(Root, {
	Action,
	Cancel,
	Content,
	Description,
	Footer,
	Header,
	Overlay,
	Portal,
	Title
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

export const ctx = {
	set: setAlertDialog,
	get: getAlertDialog,
	getClose: () => getAlertDialog().elements.close,
	getContent: () => getAlertDialog().elements.content,
	getOverlay: () => getAlertDialog().elements.overlay,
	getPortal: () => getAlertDialog().elements.portalled,
	getTitle: () => getAlertDialog().elements.title,
	getDescription: () => getAlertDialog().elements.description,
	getOpen: () => getAlertDialog().states.open
};

const NAME = "alertDialog";

function setAlertDialog(props: CreateDialogProps) {
	const alertDialog = createDialog({ ...props });
	setContext(NAME, alertDialog);
	const {
		elements: { trigger }
	} = alertDialog;

	return trigger;
}

function getAlertDialog() {
	return getContext<Dialog>(NAME);
}
