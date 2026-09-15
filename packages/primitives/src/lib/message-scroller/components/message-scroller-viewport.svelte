<script lang="ts">
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerViewportProps } from "../types.js";
	import { USER_SCROLL_KEYS } from "../types.js";
	import {
		MessageScrollerProviderState,
		usePendingDefaultScroll,
	} from "../message-scroller.svelte.js";

	let {
		children,
		child,
		ref = $bindable(null),
		"aria-label": ariaLabel,
		onkeydown,
		onscroll,
		ontouchmove,
		onwheel,
		preserveScrollOnPrepend = true,
		role,
		tabindex,
		...restProps
	}: MessageScrollerViewportProps = $props();

	const root = MessageScrollerProviderState.get();
	const pendingDefaultScroll = usePendingDefaultScroll();
	let viewportElement = $state<HTMLDivElement | null>(null);

	$effect.pre(() => {
		root.preserveScrollOnPrependRef.current = preserveScrollOnPrepend;
	});

	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		),
		(node) => {
			viewportElement = node as HTMLDivElement | null;
			root.setViewportElement(viewportElement);
		}
	);

	$effect(() => {
		const viewport = viewportElement;

		if (!viewport || typeof ResizeObserver === "undefined") {
			return;
		}

		// Coalesce into rAF: handleResize mutates the spacer inside the observed
		// content, and resizing an observed element during delivery fires
		// "ResizeObserver loop completed with undelivered notifications".
		let frame = 0;

		const observer = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(root.handleResize);
		});

		observer.observe(viewport);

		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});

	function handleScroll(event: Event) {
		root.syncAfterScroll();
		onscroll?.(event as UIEvent & { currentTarget: EventTarget & HTMLDivElement });
	}

	function handleWheel(event: WheelEvent) {
		root.userScrollIntent();
		onwheel?.(event as WheelEvent & { currentTarget: EventTarget & HTMLDivElement });
	}

	function handleTouchMove(event: TouchEvent) {
		root.userScrollIntent();
		ontouchmove?.(event as TouchEvent & { currentTarget: EventTarget & HTMLDivElement });
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (USER_SCROLL_KEYS.has(event.key)) {
			root.userScrollIntent();
		}

		onkeydown?.(event as KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement });
	}

	const mergedProps = $derived(
		mergeProps(restProps, {
			role: role ?? "region",
			"aria-label": ariaLabel ?? "Messages",
			tabindex: tabindex ?? 0,
			onkeydown: handleKeyDown,
			onscroll: handleScroll,
			ontouchmove: handleTouchMove,
			onwheel: handleWheel,
			"data-pending-scroll": pendingDefaultScroll.current ? "" : undefined,
			...attachment,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
