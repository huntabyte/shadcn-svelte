import {
	createPopover,
	type CreatePopoverProps,
	type Popover as PopoverReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { getOptionUpdater, removeUndefined } from "../internal/helpers";

const NAME = "Popover";

export const ctx = {
	set,
	get,
	getContent,
	getTrigger
};

function set(props: CreatePopoverProps) {
	const popover = createPopover({
		...removeUndefined(props),
		forceVisible: true
	});
	setContext(NAME, popover);
	return {
		...popover,
		updateOption: getOptionUpdater(popover.options)
	};
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
