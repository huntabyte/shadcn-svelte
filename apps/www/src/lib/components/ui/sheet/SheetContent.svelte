<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import { X } from "lucide-svelte";
	import { Dialog as SheetPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";
	import { sheetVariants } from ".";
	import SheetOverlay from "./SheetOverlay.svelte";
	import SheetPortal from "./SheetPortal.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let position: VariantProps<typeof sheetVariants>["position"] =
		"right";
	export let size: VariantProps<typeof sheetVariants>["size"] = "default";
</script>

<SheetPortal {position}>
	<SheetOverlay />
	<SheetPrimitive.Content
		class={cn(sheetVariants({ position, size }), className)}
		{...$$restProps}
	>
		<slot />
		<SheetPrimitive.Close
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPortal>
