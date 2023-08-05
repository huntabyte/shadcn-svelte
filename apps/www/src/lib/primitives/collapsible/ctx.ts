import {
	createCollapsible,
	type Collapsible as CollapsibleReturn,
	type CreateCollapsibleProps as CollapsibleProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

const NAME = "collapsible";

export const ctx = {
	get,
	set,
	getContent,
	getTrigger: () => get().elements.trigger
};

function get() {
	return getContext<CollapsibleReturn>(NAME);
}

function set(props: CollapsibleProps) {
	const collapsible = createCollapsible({ ...props });
	setContext(NAME, collapsible);
	const {
		elements: { root }
	} = collapsible;
	return root;
}

function getContent() {
	const {
		elements: { content },
		states: { open }
	} = get();
	return { content, open };
}
