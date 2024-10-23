<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SheetPrimitive.OverlayProps = $props();

	export { className as class };
</script>

<SheetPrimitive.Overlay
	bind:ref
	class={cn("bg-background/80 fixed inset-0 z-50 backdrop-blur-sm ", className)}
	{...restProps}
/>
