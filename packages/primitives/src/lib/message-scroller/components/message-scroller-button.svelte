<script lang="ts">
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerButtonProps } from "../types.js";
	import { MessageScrollerProviderState } from "../message-scroller.svelte.js";

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

	const root = MessageScrollerProviderState.get();
	const isActive = $derived(direction === "start" ? root.scrollable.start : root.scrollable.end);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (!isActive) return;

		onclick?.(event);

		if (event.defaultPrevented) return;

		event.currentTarget.blur();

		if (direction === "start") {
			root.scrollToStart({ behavior });
		} else {
			root.scrollToEnd({ behavior });
		}
	}

	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		)
	);
	const snippetProps = $derived({
		active: isActive,
		direction,
	});
	const mergedProps = $derived(
		mergeProps(restProps, {
			type,
			inert: isActive ? undefined : true,
			tabindex: isActive ? tabindex : -1,
			onclick: handleClick,
			"data-active": isActive ? "true" : "false",
			...attachment,
		})
	);
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
