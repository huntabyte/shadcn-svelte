<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.OverlayProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Overlay
	class={cn(
		"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in",
		className
	)}
	{...$$restProps}
/>
