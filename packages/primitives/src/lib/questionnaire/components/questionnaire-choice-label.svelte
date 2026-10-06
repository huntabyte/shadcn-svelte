<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoiceLabelState } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoiceLabelProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: QuestionnaireChoiceLabelProps = $props();

	const labelState = QuestionnaireChoiceLabelState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
	const mergedProps = $derived(mergeProps(restProps, labelState.props));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<span {...mergedProps}>
		{@render children?.()}
	</span>
{/if}
