<script lang="ts">
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	const DEFAULT_SCROLL_EDGE_THRESHOLD = 8;
	const AUTOSCROLLING_CLEAR_DELAY = 180;

	let {
		class: className,
		direction = "end",
		variant = "secondary",
		size = "icon-sm",
		active = undefined,
		behavior = "smooth",
		children,
		onclick,
		...restProps
	}: ButtonProps & {
		direction?: "start" | "end";
		active?: boolean;
		behavior?: ScrollBehavior;
	} = $props();

	let buttonRef = $state<HTMLButtonElement | null>(null);
	let derivedActive = $state(false);
	let isAutoscrolling = $state(false);
	let isActive = $derived(active ?? derivedActive);
	let autoscrollingTimeout: ReturnType<typeof setTimeout> | null = null;

	function getViewport() {
		const root = buttonRef?.closest('[data-slot="message-scroller"]');
		const viewport = root?.querySelector('[data-slot="message-scroller-viewport"]');

		return viewport instanceof HTMLElement ? viewport : null;
	}

	function updateActive() {
		const viewport = getViewport();

		if (!viewport) {
			derivedActive = false;
			return;
		}

		const nextActive =
			direction === "end"
				? viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight >
					DEFAULT_SCROLL_EDGE_THRESHOLD
				: viewport.scrollTop > DEFAULT_SCROLL_EDGE_THRESHOLD;

		if (isAutoscrolling) {
			derivedActive = false;
			return;
		}

		derivedActive = nextActive;
	}

	function handleScroll() {
		if (isAutoscrolling) {
			const viewport = getViewport();
			if (viewport) {
				scheduleAutoscrollingClear(viewport);
			}

			updateActive();
			derivedActive = false;
			return;
		}

		updateActive();
	}

	function clearAutoscrollingTimeout() {
		if (autoscrollingTimeout === null) return;

		clearTimeout(autoscrollingTimeout);
		autoscrollingTimeout = null;
	}

	function scheduleAutoscrollingClear(viewport: HTMLElement) {
		clearAutoscrollingTimeout();
		autoscrollingTimeout = setTimeout(() => {
			isAutoscrolling = false;
			viewport.removeAttribute("data-autoscrolling");
			updateActive();
		}, AUTOSCROLLING_CLEAR_DELAY);
	}

	function startAutoscrolling(viewport: HTMLElement) {
		isAutoscrolling = true;
		derivedActive = false;
		viewport.toggleAttribute("data-autoscrolling", true);
		scheduleAutoscrollingClear(viewport);
	}

	function scrollToEdge(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		if (!isActive) return;

		(onclick as ((event: MouseEvent) => void) | undefined)?.(event);
		if (event.defaultPrevented) return;

		event.currentTarget.blur();
		const viewport = getViewport();
		if (!viewport) return;

		startAutoscrolling(viewport);

		viewport.scrollTo({
			top: direction === "end" ? viewport.scrollHeight - viewport.clientHeight : 0,
			behavior,
		});
	}

	$effect(() => {
		buttonRef;
		direction;

		const viewport = getViewport();
		if (!viewport) return;

		updateActive();

		const content = viewport.querySelector('[data-slot="message-scroller-content"]');
		const resizeObserver =
			typeof ResizeObserver === "undefined"
				? null
				: new ResizeObserver(() => requestAnimationFrame(updateActive));

		resizeObserver?.observe(viewport);
		if (content instanceof HTMLElement) {
			resizeObserver?.observe(content);
		}

		viewport.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			clearAutoscrollingTimeout();
			viewport.removeAttribute("data-autoscrolling");
			viewport.removeEventListener("scroll", handleScroll);
			resizeObserver?.disconnect();
		};
	});
</script>

<Button
	bind:ref={buttonRef}
	data-slot="message-scroller-button"
	data-direction={direction}
	data-variant={variant}
	data-size={size}
	data-active={isActive}
	{variant}
	{size}
	class={cn(
		"border-border bg-background text-foreground hover:bg-muted hover:text-foreground absolute inset-s-1/2 -translate-x-1/2 transition-[translate,scale,opacity] duration-200 data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
		className
	)}
	onclick={scrollToEdge}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ArrowDownIcon />
		<span class="sr-only">{direction === "end" ? "Scroll to end" : "Scroll to start"}</span>
	{/if}
</Button>
