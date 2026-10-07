<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { createAttachmentKey } from "svelte/attachments";
	import { cn } from "$lib/utils.js";
	import { getProvider } from "./toast-context.js";
	import type { HTMLAttributes } from "svelte/elements";
	import "./toaster.css";
	let {
		children,
		child,
		class: className,
		style = "",
		ref = $bindable(null),
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: Record<string, unknown>; state: { expanded: boolean } }]>;
	} = $props();
	const context = getProvider();
	const store = context.store;
	const items = $derived.by(() => {
		void context.version;
		return store.toasts;
	});
	const expanded = $derived.by(() => {
		void context.version;
		return store.expanded;
	});
	const focused = $derived.by(() => {
		void context.version;
		return store.focused;
	});
	const previousFocus = $derived.by(() => {
		void context.version;
		return store.previousFocus;
	});
	let leaving = false;
	let touching = false;
	function flushLeave() {
		if (!leaving || touching || store.toasts.some((item) => item.transitionStatus === "ending"))
			return;
		store.setHovering(false);
		leaving = false;
	}
	$effect(() => {
		void items;
		flushLeave();
	});
	function guard(event: FocusEvent) {
		const first =
			event.relatedTarget === ref
				? store.toasts.find((item) => item.transitionStatus !== "ending" && !item.limited)
				: undefined;
		if (first) first.ref?.focus({ preventScroll: true });
		else store.restoreFocus();
	}
	function focus() {
		const active = ref?.ownerDocument.activeElement;
		if (active instanceof HTMLElement && active.matches(":focus-visible")) store.setFocused(true);
	}
	function blur(event: FocusEvent) {
		if (!ref?.contains(event.relatedTarget as Node)) store.setFocused(false);
	}
	function keydown(event: KeyboardEvent) {
		if (event.key === "Tab" && event.shiftKey && event.target === ref) {
			event.preventDefault();
			store.restoreFocus();
		}
	}
	onMount(() => {
		store.setViewport(ref);
		const win = ref!.ownerDocument.defaultView!;
		const doc = ref!.ownerDocument;
		const globalKey = (event: KeyboardEvent) => {
			if (event.key !== "F6" || !store.toasts.length || event.target === ref) return;
			event.preventDefault();
			store.saveFocus();
			ref?.focus({ preventScroll: true });
			store.setFocused(true);
		};
		const windowBlur = (event: FocusEvent) => {
			if (event.target === win) store.setWindowFocused(false);
		};
		const windowFocus = (event: FocusEvent) => {
			if (!event.relatedTarget) store.setWindowFocused(true);
		};
		const pointer = (event: PointerEvent) => {
			if (event.pointerType === "touch" && !ref?.contains(event.target as Node)) {
				touching = false;
				leaving = false;
				store.setHovering(false);
				store.setFocused(false);
			}
		};
		const visibility = () => store.setWindowFocused(!doc.hidden);
		win.addEventListener("keydown", globalKey);
		win.addEventListener("blur", windowBlur, true);
		win.addEventListener("focus", windowFocus, true);
		doc.addEventListener("pointerdown", pointer, true);
		doc.addEventListener("visibilitychange", visibility);
		return () => {
			store.setViewport(null);
			win.removeEventListener("keydown", globalKey);
			win.removeEventListener("blur", windowBlur, true);
			win.removeEventListener("focus", windowFocus, true);
			doc.removeEventListener("pointerdown", pointer, true);
			doc.removeEventListener("visibilitychange", visibility);
		};
	});
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		...restProps,
		[attachmentKey]: (node: HTMLDivElement) => {
			ref = node;
			store.setViewport(node);
			return () => {
				if (ref === node) {
					ref = null;
					store.setViewport(null);
				}
			};
		},
		"data-slot": "toast-viewport",
		"data-expanded": expanded ? "" : undefined,
		class: cn(
			"base-toast-viewport pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-sm outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
			className
		),
		style: `--toast-frontmost-height:${items[0]?.height ?? 0}px;${style}`,
		tabindex: -1,
		role: "region" as const,
		"aria-live": "polite" as const,
		"aria-atomic": false,
		"aria-relevant": "additions text" as const,
		"aria-label": restProps["aria-label"] ?? "Notifications",
		onmouseenter: () => {
			leaving = false;
			store.setHovering(true);
		},
		onmousemove: () => {
			leaving = false;
			store.setHovering(true);
		},
		onmouseleave: () => {
			leaving = true;
			flushLeave();
		},
		onfocusin: focus,
		onfocusout: blur,
		onclick: focus,
		onkeydown: keydown,
		onpointerdown: (event: PointerEvent) => {
			if (event.pointerType === "touch") touching = true;
		},
		onpointerup: (event: PointerEvent) => {
			if (event.pointerType === "touch") {
				touching = false;
				flushLeave();
			}
		},
		onpointercancel: () => {
			touching = false;
			flushLeave();
		},
	} satisfies HTMLAttributes<HTMLDivElement> & Record<string, unknown>);
</script>

{#snippet focusGuard()}
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<span tabindex="0" class="sr-only" aria-hidden="true" onfocus={guard}></span>
{/snippet}
{#if items.length && previousFocus}{@render focusGuard()}{/if}
{#if child}
	{@render child({ props: elementProps, state: { expanded } })}
{:else}
	<div {...elementProps}>
		{#if items.length && previousFocus}{@render focusGuard()}{/if}
		{@render children?.()}
		{#if items.length && previousFocus}{@render focusGuard()}{/if}
	</div>
{/if}
{#if !focused}
	<div class="sr-only">
		{#each items.filter((item) => item.priority === "high") as item (item.id)}
			<div role="alert" aria-atomic="true">
				{#if typeof item.title === "function"}{@render item.title()}{:else}{item.title ?? ""}{/if}
				{#if typeof item.description === "function"}{@render item.description()}{:else}{item.description ??
						""}{/if}
			</div>
		{/each}
	</div>
{/if}
