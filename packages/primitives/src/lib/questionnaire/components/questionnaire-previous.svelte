<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnairePreviousProps } from "../types.js";
	import { QuestionnaireActionState } from "../questionnaire.svelte.js";

	let {
		children,
		child,
		disabled = false,
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: QuestionnairePreviousProps = $props();

	const actionState = QuestionnaireActionState.create("previous", {
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
			Previous
		{/if}
	</button>
{/if}
