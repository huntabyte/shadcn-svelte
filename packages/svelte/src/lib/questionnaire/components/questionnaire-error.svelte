<script lang="ts">
	import { untrack } from "svelte";
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireErrorProps } from "../types.js";
	import { QuestionnaireItemStateClass } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();

	let { children, child, id = createId(uid), ...restProps }: QuestionnaireErrorProps = $props();

	const item = QuestionnaireItemStateClass.get();

	$effect.pre(() => {
		const errorId = id;
		return untrack(() => item.registerError(errorId));
	});

	const snippetProps = $derived({ invalid: item.invalid });
	const defaultMessage = $derived(
		item.opts.required.current
			? "Choose an answer to continue."
			: "Choose an answer or skip this question."
	);
	const mergedProps = $derived(
		mergeProps(restProps, {
			hidden: !item.invalid,
			id,
			role: item.invalid ? "alert" : undefined,
			"data-invalid": item.invalid ? "" : undefined,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<p {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{defaultMessage}
		{/if}
	</p>
{/if}
