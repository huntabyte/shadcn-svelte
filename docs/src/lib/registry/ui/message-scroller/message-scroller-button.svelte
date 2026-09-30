<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn-svelte/primitives/message-scroller";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { ButtonSize, ButtonVariant } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		direction = "end",
		class: className,
		children,
		variant = "secondary",
		size = "icon-sm",
		...restProps
	}: MessageScrollerPrimitive.ButtonProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	} = $props();
</script>

<MessageScrollerPrimitive.Button
	data-slot="message-scroller-button"
	data-direction={direction}
	data-variant={variant}
	data-size={size}
	{direction}
	class={cn(
		"cn-message-scroller-button absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
		className
	)}
	{...restProps}
>
	{#snippet child({ props })}
		<Button {variant} {size} {...props}>
			{#if children}
				{@render children()}
			{:else}
				<IconPlaceholder
					lucide="ArrowDownIcon"
					tabler="IconArrowDown"
					hugeicons="ArrowDown02Icon"
					phosphor="ArrowDownIcon"
					remixicon="RiArrowDownLine"
				/>
				<span class="sr-only">
					{direction === "end" ? "Scroll to end" : "Scroll to start"}
				</span>
			{/if}
		</Button>
	{/snippet}
</MessageScrollerPrimitive.Button>
