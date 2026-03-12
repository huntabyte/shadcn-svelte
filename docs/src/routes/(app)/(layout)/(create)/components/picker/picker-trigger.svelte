<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		submenu = false,
		children,
		...restProps
	}: DropdownMenuPrimitive.TriggerProps & {
		submenu?: boolean;
	} = $props();
</script>

{#if submenu}
	<DropdownMenuPrimitive.SubTrigger
		bind:ref
		data-slot="dropdown-menu-sub-trigger"
		class={cn(
			"focus:bg-accent/95 focus:text-accent-foreground focus:ring-foreground/20 not-data-[variant=destructive]:focus:**:text-accent-foreground data-[state=open]:bg-accent/95 data-[state=open]:text-accent-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:ring-1 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className
		)}
		disabled={restProps.disabled ?? false}
	>
		{@render children?.()}
	</DropdownMenuPrimitive.SubTrigger>
{:else}
	<DropdownMenuPrimitive.Trigger
		bind:ref
		data-slot="dropdown-menu-trigger"
		class={cn(
			"ring-foreground/10 hover:bg-muted focus-visible:ring-foreground/50 data-[state=open]:bg-muted relative w-40 shrink-0 touch-manipulation rounded-xl p-3 ring-1 select-none focus-visible:outline-none disabled:opacity-50 md:w-full md:rounded-lg md:px-2.5 md:py-2",
			className
		)}
		disabled={restProps.disabled}
	>
		{@render children?.()}
	</DropdownMenuPrimitive.Trigger>
{/if}
