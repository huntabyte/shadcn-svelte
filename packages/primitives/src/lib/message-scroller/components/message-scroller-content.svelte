<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { MessageScrollerContentState } from "../message-scroller.svelte.js";
	import type { MessageScrollerContentProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		"aria-relevant": ariaRelevant,
		role,
		spacerClassName,
		...restProps
	}: MessageScrollerContentProps = $props();

	const contentState = MessageScrollerContentState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		ariaRelevant: boxWith(() => ariaRelevant),
		role: boxWith(() => role),
		spacerClassName: boxWith(() => spacerClassName),
		useChildSnippet: boxWith(() => Boolean(child)),
	});

	const mergedProps = $derived(mergeProps(restProps, contentState.props));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
		<div
			aria-hidden="true"
			data-message-scroller-spacer=""
			hidden
			class={spacerClassName}
			{...contentState.spacerAttachment}
		></div>
	</div>
{/if}
