<script lang="ts">
	import { cn } from "$lib/utils";
	import { Dialog as DialogPrimitive } from "radix-svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPrimitive.Overlay
	class={cn(
		"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
		className
	)}
	{...$$restProps}
/>
