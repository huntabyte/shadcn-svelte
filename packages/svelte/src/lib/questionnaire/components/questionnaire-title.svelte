<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireTitleProps } from "../types.js";
	import { QuestionnaireItemStateClass } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireTitleProps = $props();

	QuestionnaireItemStateClass.get();
	const mergedProps = $derived(mergeProps(restProps));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<legend {...mergedProps}>
		{@render children?.()}
	</legend>
{/if}
