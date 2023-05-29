<script lang="ts">
	import { X } from "lucide-svelte";
	import { Dialog as DialogPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";
	import DialogOverlay from "./DialogOverlay.svelte";
	import DialogPortal from "./DialogPortal.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPortal>
	<DialogOverlay />
	<DialogPrimitive.Content
		class={cn(
			"fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
			className
		)}
		{...$$restProps}
	>
		<slot />
		<DialogPrimitive.Close
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X className="h-4 w-4" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</DialogPortal>
