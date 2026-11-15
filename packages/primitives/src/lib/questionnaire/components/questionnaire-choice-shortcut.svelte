<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoiceShortcutState } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoiceShortcutProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: QuestionnaireChoiceShortcutProps = $props();

	const shortcutState = QuestionnaireChoiceShortcutState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
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
