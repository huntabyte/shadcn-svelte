<script lang="ts">
	import BubbleAlignment from "./bubble-alignment.svelte";
	import BubbleButtonLinks from "./bubble-button-links.svelte";
	import BubbleCollapsible from "./bubble-collapsible.svelte";
	import BubbleGrouped from "./bubble-grouped.svelte";
	import BubbleReactionsButtons from "./bubble-reactions-buttons.svelte";
	import BubbleSizes from "./bubble-sizes.svelte";
	import BubbleVariants from "./bubble-variants.svelte";
	import BubbleWithReactions from "./bubble-with-reactions.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<BubbleSizes />
	<BubbleVariants />
	<BubbleAlignment />
	<BubbleGrouped />
	<BubbleCollapsible />
	<BubbleButtonLinks />
	<BubbleWithReactions />
	<BubbleReactionsButtons />
</ExampleWrapper>
