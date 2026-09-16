<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireProgressProps } from "../types.js";
	import { QuestionnaireProgressStateClass } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireProgressProps = $props();

	const progressState = QuestionnaireProgressStateClass.create();
	const snippetProps = $derived(progressState.viewState);
	const mergedProps = $derived(mergeProps(restProps, progressState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{progressState.label}
		{/if}
	</div>
{/if}
