<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireItemProps } from "../types.js";
	import { QuestionnaireItemStateClass } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();

	let {
		children,
		child,
		id = createId(uid),
		ref = $bindable(null),
		"aria-describedby": ariaDescribedBy,
		"aria-keyshortcuts": ariaKeyShortcuts,
		disabled = false,
		invalid = false,
		multiple = false,
		name,
		onStatusChange,
		required = false,
		...restProps
	}: QuestionnaireItemProps = $props();

	const itemState = QuestionnaireItemStateClass.create({
		id: boxWith(() => id),
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		ariaDescribedBy: boxWith(() => ariaDescribedBy),
		ariaKeyShortcuts: boxWith(() => ariaKeyShortcuts),
		disabled: boxWith(() => disabled),
		invalid: boxWith(() => invalid),
		multiple: boxWith(() => multiple),
		name: boxWith(() => name),
		onStatusChange: boxWith(() => onStatusChange),
		required: boxWith(() => required),
	});

	const mergedProps = $derived(mergeProps(restProps, itemState.props));
	const snippetProps = $derived(itemState.viewState);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<fieldset bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</fieldset>
{/if}
