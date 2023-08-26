<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import {
		SheetOverlay,
		SheetPortal,
		sheetTransitions,
		sheetVariants,
		type Side
	} from ".";
	import { X } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { fly } from "svelte/transition";

	type $$Props = SheetPrimitive.ContentProps & {
		side?: Side;
	};

	let className: $$Props["class"] = undefined;
	export let side: $$Props["side"] = "right";
	export let transition: $$Props["transition"] = fly;
	export let transitionConfig: $$Props["transitionConfig"] =
		sheetTransitions[side ? side : "right"];
	export { className as class };
</script>

<SheetPortal>
	<SheetOverlay />
	<SheetPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(sheetVariants({ side }), className)}
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
