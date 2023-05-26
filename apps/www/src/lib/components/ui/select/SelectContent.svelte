<script lang="ts">
	import { Select as SelectPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		class={cn(
			"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 translate-y-1",
			className
		)}
		{...$$restProps}
	>
		<SelectPrimitive.Viewport
			class={cn(
				"p-1",
				"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
			)}
		>
			<slot />
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
