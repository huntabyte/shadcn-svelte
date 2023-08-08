<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AlertDialogPrimitive.OverlayProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPrimitive.Overlay
	class={cn(
		"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
		className
	)}
	{...$$restProps}
/>
