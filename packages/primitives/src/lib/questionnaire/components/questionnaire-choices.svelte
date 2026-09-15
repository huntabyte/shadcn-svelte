<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireChoicesProps } from "../types.js";
	import { QuestionnaireItemStateClass } from "../questionnaire.svelte.js";

	let { children, child, ...restProps }: QuestionnaireChoicesProps = $props();

	const item = QuestionnaireItemStateClass.get();
	const snippetProps = $derived({ shortcuts: item.root.shortcuts });
	const mergedProps = $derived(
		mergeProps(restProps, {
			"data-shortcuts": item.root.shortcuts ?? undefined,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
