<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireSubmitProps } from "../types.js";
	import { QuestionnaireActionState } from "../questionnaire.svelte.js";

	let {
		children,
		child,
		disabled = false,
		tabindex,
		type = "submit",
		...restProps
	}: QuestionnaireSubmitProps = $props();

	const actionState = QuestionnaireActionState.create("submit", {
		disabled: boxWith(() => disabled),
		onclick: boxWith(() => undefined),
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
			Submit
		{/if}
	</button>
{/if}
