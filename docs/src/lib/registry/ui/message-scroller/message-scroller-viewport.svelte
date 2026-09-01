<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import {
		MESSAGE_SCROLLER_USER_SCROLL_KEYS,
		useMessageScrollerController,
	} from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const controller = useMessageScrollerController();
	let {
		ref = $bindable(null),
		class: className,
		children,
		preserveScrollOnPrepend = true,
		onscroll,
		onwheel,
		ontouchmove,
		onkeydown,
		role = "region",
		"aria-label": ariaLabel = "Messages",
		tabindex = 0,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		preserveScrollOnPrepend?: boolean;
	} = $props();

	function handleScroll(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.syncAfterScroll();
		onscroll?.(event);
	}

	function handleWheel(event: WheelEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.userScrollIntent();
		onwheel?.(event);
	}

	function handleTouchMove(event: TouchEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		controller.userScrollIntent();
		ontouchmove?.(event);
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		if (MESSAGE_SCROLLER_USER_SCROLL_KEYS.includes(event.key)) controller.userScrollIntent();
		onkeydown?.(event);
	}

	$effect(() => {
		controller.preserveScrollOnPrepend = preserveScrollOnPrepend;
		controller.setViewport(ref);
		if (!ref || typeof ResizeObserver === "undefined") return;

		let frame = 0;
		const observer = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => controller.handleResize());
		});
		observer.observe(ref);
		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
			controller.setViewport(null);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={ref}
	data-slot="message-scroller-viewport"
	{role}
	aria-label={ariaLabel}
	{tabindex}
	class={cn(
		"cn-message-scroller-viewport size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent",
		className
	)}
	onscroll={handleScroll}
	onwheel={handleWheel}
	ontouchmove={handleTouchMove}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children?.()}
</div>
