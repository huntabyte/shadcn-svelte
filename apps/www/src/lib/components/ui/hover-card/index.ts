import {
	createHoverCard,
	type CreateHoverCardProps as HoverCardProps,
	type HoverCard as HoverCardReturn,
	melt
} from "@melt-ui/svelte";
import { default as Root } from "./HoverCard.svelte";
import { default as Content } from "./HoverCardContent.svelte";
import { default as Trigger } from "./HoverCardTrigger.svelte";
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

function set(props: HoverCardProps) {
	const hovercard = createHoverCard({ ...props, forceVisible: true });
	setContext(NAME, hovercard);
}

export const HoverCard = Object.assign(Root, {
	Content,
	Trigger
});

export {
	Root as HoverCardRoot,
	Content as HoverCardTitle,
	Trigger as HoverCardTrigger
};
