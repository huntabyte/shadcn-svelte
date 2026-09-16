<script lang="ts">
	import { onMount } from "svelte";
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireDescriptionProps } from "../types.js";
	import { QuestionnaireItemStateClass } from "../questionnaire.svelte.js";
	import { createId } from "$lib/internal/create-id.js";

	const uid = $props.id();

	let { children, child, id = createId(uid), ...restProps }: QuestionnaireDescriptionProps = $props();

	const item = QuestionnaireItemStateClass.get();

	onMount(() => item.registerDescription(id));

	const mergedProps = $derived(mergeProps(restProps, { id }));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<p {...mergedProps}>
		{@render children?.()}
	</p>
{/if}
