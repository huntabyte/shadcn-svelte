<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceLabelProps } from "../types.js";

	let { children, child, ...restProps }: QuestionnaireChoiceLabelProps = $props();

	const mergedProps = $derived(mergeProps(restProps));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<span {...mergedProps}>
		{@render children?.()}
	</span>
{/if}
