<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { createId } from "$lib/internal/create-id.js";
	import { QuestionnaireInputState } from "../questionnaire.svelte.js";
	import type { QuestionnaireInputProps } from "../types.js";

	const uid = $props.id();
	const answerId = createId(uid);

	let {
		children,
		child,
		id,
		ref = $bindable(null),
		defaultValue,
		disabled = false,
		onChange,
		type = "text",
		value,
		...restProps
	}: QuestionnaireInputProps = $props();

	const inputState = QuestionnaireInputState.create({
		id: boxWith(() => id ?? answerId),
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		answerId: boxWith(() => answerId),
		defaultValue: boxWith(() => defaultValue),
		disabled: boxWith(() => disabled),
		onChange: boxWith(() => onChange),
		type: boxWith(() => type),
		value: boxWith(() => value),
	});

	const snippetProps = $derived(inputState.viewState);
	const mergedProps = $derived(mergeProps(restProps, inputState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<input {...mergedProps} />
	{@render children?.()}
{/if}
