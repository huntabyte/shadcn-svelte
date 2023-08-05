import { getOptionUpdater, removeUndefined } from "$primitives/internal";
import {
	createCollapsible,
	type Collapsible as CollapsibleReturn,
	type CreateCollapsibleProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const NAME = "Collapsible";

export const ctx = {
	get,
	set
};

function set(props: CreateCollapsibleProps) {
	const collapsible = createCollapsible(removeUndefined(props));
	setContext(NAME, collapsible);
	return {
		...collapsible,
		updateOption: getOptionUpdater(collapsible.options)
	};
}

function get() {
	return getContext<CollapsibleReturn>(NAME);
}
