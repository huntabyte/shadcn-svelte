<script lang="ts">
	import { watch } from "runed";
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
	let isActive = $state(false);

	watch.pre(
		() => direction,
		(direction) => {
			const read = () => {
				const state = root.stateStore.getSnapshot();
				return direction === "start" ? state.start : state.end;
			};

			isActive = read();

			return root.stateStore.subscribe(() => {
				isActive = read();
			});
		}
	);

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
