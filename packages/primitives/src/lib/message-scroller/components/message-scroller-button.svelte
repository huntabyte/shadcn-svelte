<script lang="ts">
	import { boxWith, mergeProps } from "svelte-toolbelt";
	import { MessageScrollerButtonState } from "../message-scroller.svelte.js";
	import type { MessageScrollerButtonProps } from "../types.js";

	let {
		children,
		child,
		ref = $bindable(null),
		behavior = "smooth",
		direction = "end",
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: MessageScrollerButtonProps = $props();

	const buttonState = MessageScrollerButtonState.create({
		ref: boxWith(
			() => ref,
			(v) => (ref = v)
		),
		behavior: boxWith(() => behavior),
		direction: boxWith(() => direction),
		onclick: boxWith(() => onclick),
		tabindex: boxWith(() => tabindex),
		type: boxWith(() => type),
	});

	const snippetProps = $derived(buttonState.snippetProps);
	const mergedProps = $derived(mergeProps(restProps, buttonState.props, buttonState.attachment));
</script>

{#if child}
	{@render child({ props: mergedProps, ...snippetProps })}
{:else}
	<button {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			<span>Scroll to {direction}</span>
		{/if}
	</button>
{/if}
