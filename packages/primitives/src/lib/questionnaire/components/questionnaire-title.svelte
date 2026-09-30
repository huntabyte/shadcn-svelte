<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireTitleProps } from "../types.js";

	let { children, child, ...restProps }: QuestionnaireTitleProps = $props();

	const mergedProps = $derived(mergeProps(restProps));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<legend {...mergedProps}>
		{@render children?.()}
	</legend>
{/if}
