<script lang="ts">
	import { mergeProps } from "svelte-toolbelt";
	import type { QuestionnaireSkipProps } from "../types.js";
	import { getNavigationProps, QuestionnaireRootState } from "../questionnaire.svelte.js";

	let {
		children,
		child,
		disabled = false,
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: QuestionnaireSkipProps = $props();

	const root = QuestionnaireRootState.get();
	const visible = $derived(root.activeItemRequired === false);
	const navigation = $derived(
		getNavigationProps({
			disabled,
			onClick: (event) => {
				onclick?.(event as unknown as MouseEvent & { currentTarget: HTMLButtonElement });
				if (!event.defaultPrevented) root.skipCurrent();
			},
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
			Skip
		{/if}
	</button>
{/if}
