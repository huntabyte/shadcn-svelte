<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoiceProps } from "../types.js";
	import { QuestionnaireChoiceStateClass } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();
	const answerId = createId(uid);

	let {
		children,
		child,
		checked,
		defaultChecked = false,
		disabled = false,
		onChange,
		value,
		...restProps
	}: QuestionnaireChoiceProps = $props();

	const choiceState = QuestionnaireChoiceStateClass.create({
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
