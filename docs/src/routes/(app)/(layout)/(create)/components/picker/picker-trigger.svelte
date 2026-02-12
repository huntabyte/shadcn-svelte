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
			"hover:bg-muted data-popup-open:bg-muted border-foreground/10 bg-muted/50 relative w-[160px] shrink-0 touch-manipulation rounded-xl border p-2 select-none disabled:opacity-50 md:w-full md:rounded-lg md:border-transparent md:bg-transparent",
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
			"hover:bg-muted data-popup-open:bg-muted border-foreground/10 bg-muted/50 relative w-[160px] shrink-0 touch-manipulation rounded-xl border p-2 select-none disabled:opacity-50 md:w-full md:rounded-lg md:border-transparent md:bg-transparent",
			className
		)}
		disabled={restProps.disabled}
	>
		{@render children?.()}
	</DropdownMenuPrimitive.Trigger>
{/if}
