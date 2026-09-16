<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireErrorProps } from "../types.js";
	import { QuestionnaireErrorStateClass } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();

	let { children, child, id = createId(uid), ...restProps }: QuestionnaireErrorProps = $props();

	const errorState = QuestionnaireErrorStateClass.create({
		id: boxWith(() => id),
	});
	const snippetProps = $derived(errorState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, errorState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<p {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{errorState.defaultMessage}
		{/if}
	</p>
{/if}
