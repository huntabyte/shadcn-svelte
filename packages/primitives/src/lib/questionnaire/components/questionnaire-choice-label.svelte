<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceLabelProps } from "../types.js";
	import { QuestionnaireChoiceStateClass } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireChoiceLabelProps = $props();

	QuestionnaireChoiceStateClass.get();
	const mergedProps = $derived(mergeProps(restProps));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<span {...mergedProps}>
		{@render children?.()}
	</span>
{/if}
