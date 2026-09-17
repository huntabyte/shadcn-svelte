<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoiceShortcutStateClass } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoiceShortcutProps } from "../types.js";

	let { children, child, ...restProps }: QuestionnaireChoiceShortcutProps = $props();

	const shortcutState = QuestionnaireChoiceShortcutStateClass.create();
	const snippetProps = $derived(shortcutState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, shortcutState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<span {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{shortcutState.shortcut}
		{/if}
	</span>
{/if}
