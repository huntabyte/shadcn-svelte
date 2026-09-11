<script lang="ts">
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceInputProps } from "../types.js";
	import { QuestionnaireChoiceStateClass } from "../questionnaire.svelte.js";

	let { children, child, ref = $bindable(null), ...restProps }: QuestionnaireChoiceInputProps =
		$props();

	const choice = QuestionnaireChoiceStateClass.get();
	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		),
		(node) => {
			choice.inputElement = node as HTMLInputElement | null;
		}
	);
	const snippetProps = $derived(choice.viewState);
	const mergedProps = $derived(mergeProps(restProps, choice.inputProps, attachment));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<input bind:this={ref} {...mergedProps} checked={choice.checked} />
	{@render children?.()}
{/if}
