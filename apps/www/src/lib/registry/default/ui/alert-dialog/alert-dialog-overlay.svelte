<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/bits-ui";
	import { cn } from "$lib/utils";
	import { fade } from "svelte/transition";

	type $$Props = AlertDialogPrimitive.OverlayProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Overlay
	transition={fade}
	transitionConfig={{ duration: 150 }}
	class={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)}
	{...$$restProps}
/>
