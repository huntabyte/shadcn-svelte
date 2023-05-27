<script lang="ts">
	import type { DialogOverlayProps } from "radix-svelte";
	import { Dialog as SheetPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = DialogOverlayProps;
</script>

<SheetPrimitive.Overlay
	class={cn(
		"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
		className
	)}
	{...$$restProps}
/>
