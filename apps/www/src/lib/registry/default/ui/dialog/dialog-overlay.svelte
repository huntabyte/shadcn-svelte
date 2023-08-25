<script lang="ts">
	import { Dialog as DialogPrimitive } from "@huntabyte/bits-ui";
	import { cn } from "$lib/utils";
	import { fade } from "svelte/transition";

	type $$Props = DialogPrimitive.OverlayProps;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Overlay
	transition={fade}
	transitionConfig={{ duration: 150 }}
	class={cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm", className)}
	{...$$restProps}
/>
