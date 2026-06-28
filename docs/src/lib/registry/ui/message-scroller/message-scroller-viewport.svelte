<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { MESSAGE_SCROLLER_CONTEXT, type MessageScrollerContextValue } from "./context.js";
	import { USER_SCROLL_KEYS } from "./types.js";

	const controller = getContext<MessageScrollerContextValue | null>(MESSAGE_SCROLLER_CONTEXT);

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

	function handleScroll(event: Event) {
		controller?.syncAfterScroll();
		(onscroll as ((event: Event) => void) | undefined)?.(event);
	}

	function handleWheel(event: WheelEvent) {
		controller?.userScrollIntent();
		(onwheel as ((event: WheelEvent) => void) | undefined)?.(event);
	}

	function handleTouchMove(event: TouchEvent) {
		controller?.userScrollIntent();
		(ontouchmove as ((event: TouchEvent) => void) | undefined)?.(event);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (USER_SCROLL_KEYS.has(event.key)) {
			controller?.userScrollIntent();
		}

		(onkeydown as ((event: KeyboardEvent) => void) | undefined)?.(event);
	}

	$effect(() => {
		controller?.setViewportElement(ref);
		return () => controller?.setViewportElement(null);
	});

	$effect(() => {
		controller?.setPreserveScrollOnPrepend(preserveScrollOnPrepend);
	});
</script>

<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex - matches the upstream focusable scroll region. -->
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
		"scroll-fade-b scrollbar-thin scrollbar-gutter-stable data-autoscrolling:scrollbar-none size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
