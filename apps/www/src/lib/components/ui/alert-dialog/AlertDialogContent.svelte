<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";
	import AlertDialogOverlay from "./AlertDialogOverlay.svelte";
	import AlertDialogPortal from "./AlertDialogPortal.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AlertDialogPortal>
	<AlertDialogOverlay />
	<AlertDialogPrimitive.Content
		class={cn(
			"fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</AlertDialogPrimitive.Content>
</AlertDialogPortal>
