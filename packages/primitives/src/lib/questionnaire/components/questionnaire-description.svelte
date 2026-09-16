<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { createId } from "$lib/internal/create-id.js";
	import { QuestionnaireDescriptionStateClass } from "../questionnaire.svelte.js";
	import type { QuestionnaireDescriptionProps } from "../types.js";

	const uid = $props.id();

	let {
		children,
		child,
		id = createId(uid),
		...restProps
	}: QuestionnaireDescriptionProps = $props();

	const descriptionState = QuestionnaireDescriptionStateClass.create({
		id: boxWith(() => id),
	});
	const mergedProps = $derived(mergeProps(restProps, descriptionState.props));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<p {...mergedProps}>
		{@render children?.()}
	</p>
{/if}
