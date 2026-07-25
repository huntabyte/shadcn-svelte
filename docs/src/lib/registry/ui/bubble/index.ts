import Root, { bubbleVariants, type BubbleVariant } from "./bubble.svelte";
import Group from "./bubble-group.svelte";
import Content from "./bubble-content.svelte";
import Reactions, {
	bubbleReactionsVariants,
	type BubbleReactionsAlign,
	type BubbleReactionsSide,
} from "./bubble-reactions.svelte";

export {
	Root,
	Group,
	Content,
	Reactions,
	bubbleVariants,
	bubbleReactionsVariants,
	type BubbleVariant,
	type BubbleReactionsAlign,
	type BubbleReactionsSide,
	//
	Root as Bubble,
	Group as BubbleGroup,
	Content as BubbleContent,
	Reactions as BubbleReactions,
};
