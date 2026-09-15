<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireSubmitProps } from "../types.js";
	import { getNavigationProps, QuestionnaireRootState } from "../questionnaire.svelte.js";

	let {
		children,
		child,
		disabled = false,
		tabindex,
		type = "submit",
		...restProps
	}: QuestionnaireSubmitProps = $props();

	const root = QuestionnaireRootState.get();
	const visible = $derived(root.total > 0 && root.last);
	const navigation = $derived(
		getNavigationProps({
			disabled,
			shortcut: "Enter",
			status: root.activeItemStatus,
			tabIndex: tabindex,
			type,
			visible,
		})
	);
	const mergedProps = $derived(mergeProps(restProps, navigation.props));
</script>

{#if child}
	{@render child({ props: mergedProps, ...navigation.state })}
{:else}
	<button {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			Submit
		{/if}
	</button>
{/if}
