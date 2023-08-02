import {
	createCollapsible,
	type Collapsible as CollapsibleReturn,
	type CreateCollapsibleProps as CollapsibleProps,
	melt
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { default as Root } from "./Collapsible.svelte";
import { default as Content } from "./CollapsibleContent.svelte";
import { default as Trigger } from "./CollapsibleTrigger.svelte";

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

export { melt, type CollapsibleProps };

export const Collapsible = Object.assign(Root, { Content, Trigger });

export {
	Root as CollapsibleRoot,
	Content as CollapsibleContent,
	Trigger as CollapsibleTrigger
};
