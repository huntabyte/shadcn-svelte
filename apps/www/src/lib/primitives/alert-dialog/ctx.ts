import {
	createDialog,
	type Dialog as AlertDialogReturn
} from "@melt-ui/svelte";
import type { AlertDialogProps } from "./types";
import { getContext, setContext } from "svelte";

const NAME = "alertDialog";

function set(props: AlertDialogProps) {
	const alertDialog = createDialog({ ...props });
	setContext(NAME, alertDialog);
}

function get() {
	return getContext<AlertDialogReturn>(NAME);
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
