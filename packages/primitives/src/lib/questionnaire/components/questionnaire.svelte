<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireRootProps } from "../types.js";
	import { QuestionnaireRootState } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();

	let {
		children,
		child,
		id = createId(uid),
		ref = $bindable(null),
		defaultItem,
		item = $bindable(undefined),
		items,
		noValidate = true,
		onItemChange,
		onReset,
		onSubmit,
		onsubmit,
		shortcuts,
		...restProps
	}: QuestionnaireRootProps = $props();

	const rootState = QuestionnaireRootState.create({
		id: boxWith(() => id),
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		defaultItem: boxWith(() => defaultItem),
		item: boxWith(
			() => item,
			(v) => (item = v)
		),
		items: boxWith(() => items),
		noValidate: boxWith(() => noValidate),
		onItemChange: boxWith(() => onItemChange),
		onReset: boxWith(() => onReset),
		onSubmit: boxWith(() => onSubmit ?? onsubmit),
		shortcuts: boxWith(() => shortcuts),
	});

	const mergedProps = $derived(mergeProps(restProps, rootState.props));
	const snippetProps = $derived(rootState.viewState);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<form bind:this={ref} {...mergedProps}>
		{@render children?.()}
	</form>
{/if}
