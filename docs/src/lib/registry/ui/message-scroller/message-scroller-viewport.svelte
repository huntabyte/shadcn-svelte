<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScrollerController } from "./message-scroller.svelte.js";
	import { USER_SCROLL_KEYS } from "./types.js";
	import type { HTMLAttributes } from "svelte/elements";

	const controller = useMessageScrollerController();

	let {
		ref = $bindable(null),
		"aria-label": ariaLabel = "Messages",
		class: className,
		children,
		onkeydown,
		onscroll,
		ontouchmove,
		onwheel,
		preserveScrollOnPrepend = true,
		role = "region",
		tabindex = 0,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		preserveScrollOnPrepend?: boolean;
	} = $props();

	function handleScroll(event: UIEvent & { currentTarget: HTMLDivElement }) {
		controller.syncAfterScroll();
		onscroll?.(event);
	}

	function handleWheel(event: WheelEvent & { currentTarget: HTMLDivElement }) {
		controller.userScrollIntent();
		onwheel?.(event);
	}

	function handleTouchMove(event: TouchEvent & { currentTarget: HTMLDivElement }) {
		controller.userScrollIntent();
		ontouchmove?.(event);
	}

	function handleKeyDown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
		if (USER_SCROLL_KEYS.has(event.key)) controller.userScrollIntent();
		onkeydown?.(event);
	}

	$effect(() => {
		controller.setViewportElement(ref);
		if (!ref || typeof ResizeObserver === "undefined") {
			return () => controller.setViewportElement(null);
		}

		let resizeFrame = 0;
		const resizeObserver = new ResizeObserver(() => {
			cancelAnimationFrame(resizeFrame);
			resizeFrame = requestAnimationFrame(controller.handleResize);
		});
		resizeObserver.observe(ref);

		return () => {
			cancelAnimationFrame(resizeFrame);
			resizeObserver.disconnect();
			controller.setViewportElement(null);
		};
	});

	$effect(() => controller.setPreserveScrollOnPrepend(preserveScrollOnPrepend));
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={ref}
	data-slot="message-scroller-viewport"
	{role}
	aria-label={ariaLabel}
	{tabindex}
	onkeydown={handleKeyDown}
	onscroll={handleScroll}
	ontouchmove={handleTouchMove}
	onwheel={handleWheel}
	class={cn(
		"scroll-fade-b size-full min-h-0 min-w-0 [scrollbar-width:thin] [scrollbar-gutter:stable] overflow-y-auto overscroll-contain contain-content data-autoscrolling:[scrollbar-width:none]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
