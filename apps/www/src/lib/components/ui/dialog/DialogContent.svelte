<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, DialogPortal, DialogOverlay, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const content = ctx.getContent();
</script>

<DialogPortal>
	<DialogOverlay />
	<div
		use:melt={$content}
		class={cn(
			"fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
			className
		)}
		{...$$restProps}
	>
		<slot />
	</div>
</DialogPortal>
