<script lang="ts">
	import { Dialog as SheetPrimitive, type WithoutChild } from "bits-ui";
	import Cross2 from "svelte-radix/Cross2.svelte";
	import { SheetOverlay, SheetPortal, type Side, sheetVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		side = "right",
		children,
		...restProps
	}: WithoutChild<SheetPrimitive.ContentProps> & {
		side?: Side;
	} = $props();
</script>

<SheetPortal>
	<SheetOverlay />
	<SheetPrimitive.Content bind:ref class={cn(sheetVariants({ side }), className)} {...restProps}>
		{@render children?.()}
		<SheetPrimitive.Close
			class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
		>
			<Cross2 class="size-4" />
			<span class="sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPortal>
