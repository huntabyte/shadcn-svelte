import Content from "./bubble-content.svelte";
import Group from "./bubble-group.svelte";
import Reactions, {
	bubbleReactionsVariants,
	type BubbleReactionsAlign,
	type BubbleReactionsSide,
} from "./bubble-reactions.svelte";
import Root, { bubbleVariants, type BubbleVariant } from "./bubble.svelte";

export {
	Root,
	Group,
	Content,
	Reactions,
	bubbleVariants,
	bubbleReactionsVariants,
	type BubbleVariant,
	type BubbleReactionsSide,
	type BubbleReactionsAlign,
	//
	Root as Bubble,
	Group as BubbleGroup,
	Content as BubbleContent,
	Reactions as BubbleReactions,
};
