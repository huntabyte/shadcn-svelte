<script lang="ts">
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		direction = "end",
		variant = "secondary",
		size = "icon-sm",
		active = true,
		behavior = "smooth",
		children,
		onclick,
		...restProps
	}: ButtonProps & {
		direction?: "start" | "end";
		active?: boolean;
		behavior?: ScrollBehavior;
	} = $props();

	function scrollToEdge(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		(onclick as ((event: MouseEvent) => void) | undefined)?.(event);
		if (event.defaultPrevented) return;

		const target = event.currentTarget;
		if (!(target instanceof HTMLElement)) return;

		const root = target.closest('[data-slot="message-scroller"]');
		const viewport = root?.querySelector('[data-slot="message-scroller-viewport"]');
		if (!(viewport instanceof HTMLElement)) return;

		viewport.scrollTo({
			top: direction === "end" ? viewport.scrollHeight : 0,
			behavior,
		});
	}
</script>

<Button
	data-slot="message-scroller-button"
	data-direction={direction}
	data-variant={variant}
	data-size={size}
	data-active={active}
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
