<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		buttonVariants,
		type ButtonSize,
		type ButtonVariant,
	} from "$lib/registry/ui/button/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScrollerController, type ScrollDirection } from "./message-scroller.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	const controller = useMessageScrollerController();
	let {
		ref = $bindable(null),
		class: className,
		direction = "end",
		behavior = "smooth",
		variant = "secondary",
		size = "icon-sm",
		children,
		child,
		onclick,
		tabindex,
		type = "button",
		...restProps
	}: WithElementRef<HTMLButtonAttributes> & {
		direction?: ScrollDirection;
		behavior?: ScrollBehavior;
		variant?: ButtonVariant;
		size?: ButtonSize;
		child?: Snippet<
			[
				{
					props: Record<string, unknown>;
					active: boolean;
					direction: ScrollDirection;
				},
			]
		>;
	} = $props();

	const active = $derived(
		direction === "end" ? controller.scrollable.end : controller.scrollable.start
	);

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (!active) return;
		onclick?.(event);
		if (event.defaultPrevented) return;
		event.currentTarget.blur();
		if (direction === "start") controller.scrollToStart({ behavior });
		else controller.scrollToEnd({ behavior });
	}

	const mergedProps = $derived({
		class: cn(
			buttonVariants({ variant, size }),
			"cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
			className
		),
		"data-slot": "message-scroller-button",
		"data-direction": direction,
		"data-active": active ? "true" : "false",
		"data-variant": variant,
		"data-size": size,
		inert: active ? undefined : true,
		tabindex: active ? tabindex : -1,
		type,
		onclick: handleClick,
		...restProps,
	});
</script>

{#if child}
	{@render child({ props: mergedProps, active, direction })}
{:else}
	<button bind:this={ref} {...mergedProps}>
		{#if children}
			{@render children()}
		{:else}
			<IconPlaceholder
				lucide="ArrowDownIcon"
				tabler="IconArrowDown"
				hugeicons="ArrowDown01Icon"
				phosphor="ArrowDownIcon"
				remixicon="RiArrowDownLine"
			/>
			<span class="sr-only">
				{direction === "end" ? "Scroll to end" : "Scroll to start"}
			</span>
		{/if}
	</button>
{/if}
