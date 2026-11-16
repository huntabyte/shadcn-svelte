<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireProgressState } from "../questionnaire.svelte.js";
	import type { QuestionnaireProgressProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: QuestionnaireProgressProps = $props();

	const progressState = QuestionnaireProgressState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
	const snippetProps = $derived(progressState.viewState);
	const mergedProps = $derived(mergeProps(restProps, progressState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{progressState.label}
		{/if}
	</div>
{/if}
