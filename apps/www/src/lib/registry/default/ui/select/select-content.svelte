<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from "bits-ui";
	import * as Select from "$lib/registry/default/ui/select/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		position = "floating",
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		class={cn(
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
			position === "floating" &&
				"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
			className
		)}
		{position}
		{...restProps}
	>
		<Select.ScrollUpButton />
		<SelectPrimitive.Viewport
			class={cn(
				"p-1",
				position === "floating" &&
					"h-[var(--bits-select-trigger-height)] w-full min-w-[var(--bits-select-trigger-width)]"
			)}
		>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<Select.ScrollDownButton />
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
