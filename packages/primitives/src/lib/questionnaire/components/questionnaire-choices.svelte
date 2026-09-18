<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireChoicesState } from "../questionnaire.svelte.js";
	import type { QuestionnaireChoicesProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: QuestionnaireChoicesProps = $props();

	const choicesState = QuestionnaireChoicesState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
	const snippetProps = $derived(choicesState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, choicesState.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
