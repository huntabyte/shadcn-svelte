<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireActionState } from "../questionnaire.svelte.js";
	import type { QuestionnaireSkipProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		disabled = false,
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: QuestionnaireSkipProps = $props();

	const actionState = QuestionnaireActionState.create("skip", {
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		disabled: boxWith(() => disabled),
		onclick: boxWith(() => onclick),
		tabindex: boxWith(() => tabindex),
		type: boxWith(() => type),
	});
	const mergedProps = $derived(mergeProps(restProps, actionState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...actionState.state })}
{:else}
	<button {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			Skip
		{/if}
	</button>
{/if}
