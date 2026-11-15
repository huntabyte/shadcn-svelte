<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { createId } from "$lib/internal/create-id.js";
	import { QuestionnaireChoiceState } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoiceProps } from "../types.js";

	const uid = $props.id();
	const answerId = createId(uid);

	let {
		children,
		child,
		ref = $bindable(null),
		checked,
		defaultChecked = false,
		disabled = false,
		onChange,
		value,
		...restProps
	}: QuestionnaireChoiceProps = $props();

	const choiceState = QuestionnaireChoiceState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		answerId: boxWith(() => answerId),
		checked: boxWith(() => checked),
		defaultChecked: boxWith(() => defaultChecked),
		disabled: boxWith(() => disabled),
		onChange: boxWith(() => onChange),
		value: boxWith(() => value),
	});

	const mergedProps = $derived(mergeProps(restProps, choiceState.props));
	const snippetProps = $derived(choiceState.viewState);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<label {...mergedProps}>
		{@render children?.()}
	</label>
{/if}
