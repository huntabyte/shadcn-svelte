import { createDialog, type Dialog as DialogReturn } from "@melt-ui/svelte";
import type { DialogProps } from "./types";
import { getContext, setContext } from "svelte";

const NAME = "Dialog";

function set(props: DialogProps) {
	const dialog = createDialog(props);
	setContext(NAME, dialog);
}

function get() {
	return getContext<DialogReturn>(NAME);
}

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
