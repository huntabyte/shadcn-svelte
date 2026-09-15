<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireProgressProps } from "../types.js";
	import { QuestionnaireRootState } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireProgressProps = $props();

	const root = QuestionnaireRootState.get();
	const label = $derived(root.total ? `Question ${root.current} of ${root.total}` : undefined);
	const snippetProps = $derived(root.viewState);
	const mergedProps = $derived(
		mergeProps(restProps, {
			"aria-label": "Questionnaire progress",
			"aria-live": "polite",
			"aria-valuemax": root.total || undefined,
			"aria-valuemin": root.total ? 1 : undefined,
			"aria-valuenow": root.total ? root.current : undefined,
			"aria-valuetext": label,
			role: "progressbar",
			"data-current": root.current ? String(root.current) : undefined,
			"data-first": root.first ? "" : undefined,
			"data-last": root.last ? "" : undefined,
			"data-total": root.total ? String(root.total) : undefined,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			{label}
		{/if}
	</div>
{/if}
