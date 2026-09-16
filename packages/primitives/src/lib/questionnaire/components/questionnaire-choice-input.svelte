<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceInputProps } from "../types.js";
	import { QuestionnaireChoiceInputStateClass } from "../questionnaire.svelte.js";

	let { children, child, ref = $bindable(null), ...restProps }: QuestionnaireChoiceInputProps =
		$props();

	const inputState = QuestionnaireChoiceInputStateClass.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
	const snippetProps = $derived(inputState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, inputState.props, inputState.attachment));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<input bind:this={ref} {...mergedProps} checked={inputState.checked} />
	{@render children?.()}
{/if}
