<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireActionState } from "../questionnaire.svelte.js";
	import type { QuestionnaireSubmitProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		disabled = false,
		tabindex,
		type = "submit",
		...restProps
	}: QuestionnaireSubmitProps = $props();

	const actionState = QuestionnaireActionState.create("submit", {
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
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
