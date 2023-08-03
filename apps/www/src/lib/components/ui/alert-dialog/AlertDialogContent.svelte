<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, AlertDialogPortal, AlertDialogOverlay, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const content = ctx.getContent();
</script>

<AlertDialogPortal>
	<AlertDialogOverlay />
	<div
		use:melt={$content}
		class={cn(
			"fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</div>
</AlertDialogPortal>
