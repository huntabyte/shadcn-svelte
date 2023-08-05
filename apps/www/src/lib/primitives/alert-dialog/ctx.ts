import { getOptionUpdater, removeUndefined } from "$primitives/internal";
import {
	createDialog,
	type Dialog as AlertDialogReturn,
	type CreateDialogProps as CreateAlertDialogProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const NAME = "AlertDialog";

function set(props: CreateAlertDialogProps) {
	const alertDialog = createDialog({
		...removeUndefined(props),
		role: "alertdialog"
	});
	setContext(NAME, alertDialog);
	return {
		...alertDialog,
		updateOption: getOptionUpdater(alertDialog.options)
	};
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
