<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoiceInputState } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoiceInputProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: QuestionnaireChoiceInputProps = $props();

	const inputState = QuestionnaireChoiceInputState.create({
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
	<input {...mergedProps} checked={inputState.checked} />
	{@render children?.()}
{/if}
