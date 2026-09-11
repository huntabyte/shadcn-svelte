<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceShortcutProps } from "../types.js";
	import { QuestionnaireChoiceStateClass } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireChoiceShortcutProps = $props();

	const choice = QuestionnaireChoiceStateClass.get();
	const snippetProps = $derived({ shortcut: choice.shortcut });
	const mergedProps = $derived(
		mergeProps(restProps, {
			"aria-hidden": true,
			hidden: choice.shortcut === null,
			"data-shortcut": choice.shortcut ?? undefined,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<span {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{choice.shortcut}
		{/if}
	</span>
{/if}
