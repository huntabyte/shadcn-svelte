<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireNextProps } from "../types.js";
	import { getNavigationProps, QuestionnaireRootState } from "../questionnaire.svelte.js";

	let {
		children,
		child,
		disabled = false,
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: QuestionnaireNextProps = $props();

	const root = QuestionnaireRootState.get();
	const visible = $derived(root.total > 1 && !root.last);
	const navigation = $derived(
		getNavigationProps({
			disabled,
			onClick: (event) => {
				onclick?.(event as unknown as MouseEvent & { currentTarget: HTMLButtonElement });
				if (!event.defaultPrevented) root.goNext();
			},
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
			Next
		{/if}
	</button>
{/if}
