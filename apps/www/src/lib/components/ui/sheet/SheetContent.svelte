<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import { X } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { ctx, melt, sheetVariants } from ".";
	import SheetOverlay from "./SheetOverlay.svelte";
	import SheetPortal from "./SheetPortal.svelte";
	import SheetClose from "./SheetClose.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let side: VariantProps<typeof sheetVariants>["side"] = "right";

	const content = ctx.getContent();
</script>

<SheetPortal {side}>
	<SheetOverlay />
	<div
		use:melt={$content}
		class={cn(sheetVariants({ side }), className)}
		{...$$restProps}
	>
		<slot />
		<SheetClose
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</SheetClose>
	</div>
</SheetPortal>
