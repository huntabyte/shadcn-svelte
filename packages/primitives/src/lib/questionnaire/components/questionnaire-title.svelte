<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { QuestionnaireTitleState } from "../questionnaire.svelte.js";
	import type { QuestionnaireTitleProps } from "../types.js";

	let { children, child, ref = $bindable(null), ...restProps }: QuestionnaireTitleProps = $props();

	const titleState = QuestionnaireTitleState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
	});
	const mergedProps = $derived(mergeProps(restProps, titleState.props));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<legend {...mergedProps}>
		{@render children?.()}
	</legend>
{/if}
