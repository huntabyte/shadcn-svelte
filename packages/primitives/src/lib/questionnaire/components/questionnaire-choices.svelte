<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoicesStateClass } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoicesProps } from "../types.js";

	let { children, child, ...restProps }: QuestionnaireChoicesProps = $props();

	const choicesState = QuestionnaireChoicesStateClass.create();
	const snippetProps = $derived(choicesState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, choicesState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
