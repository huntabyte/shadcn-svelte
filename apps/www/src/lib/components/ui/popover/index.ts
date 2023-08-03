import {
	melt,
	createPopover,
	type CreatePopoverProps as PopoverProps,
	type Popover as PopoverReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

import Root from "./Popover.svelte";
import Content from "./PopoverContent.svelte";
import Trigger from "./PopoverTrigger.svelte";

const NAME = "Popover";

export const ctx = {
	set,
	get,
	getContent,
	getTrigger
};

function set(props: PopoverProps) {
	const popover = createPopover({ ...props, forceVisible: true });
	setContext(NAME, popover);
}

function get() {
	return getContext<PopoverReturn>(NAME);
}

function getContent() {
	const {
		elements: { content },
		states: { open }
	} = get();
	return {
		content,
		open
	};
}

function getTrigger() {
	const {
		elements: { trigger }
	} = get();
	return trigger;
}

export const Popover = Object.assign(Root, {
	Content,
	Trigger
});

export {
	Root as PopoverRoot,
	Content as PopoverContent,
	Trigger as PopoverTrigger
};

export { melt, type PopoverProps };
