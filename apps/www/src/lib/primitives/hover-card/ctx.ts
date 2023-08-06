import { getOptionUpdater, removeUndefined } from "$primitives/internal";
import {
	createHoverCard,
	type CreateHoverCardProps as HoverCardProps,
	type HoverCard as HoverCardReturn,
	melt,
	type CreateHoverCardProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

export { melt, type HoverCardProps };

const NAME = "hovercard";

export const ctx = {
	set,
	get,
	getContent,
	getTrigger: () => get().elements.trigger
};

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

function get() {
	return getContext<HoverCardReturn>(NAME);
}

function set(props: CreateHoverCardProps) {
	const hovercard = createHoverCard({
		...removeUndefined(props),
		forceVisible: true
	});
	setContext(NAME, hovercard);
	return {
		...hovercard,
		updateOption: getOptionUpdater(hovercard.options)
	};
}
