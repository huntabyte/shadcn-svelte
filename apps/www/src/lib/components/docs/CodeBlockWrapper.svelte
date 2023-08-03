<script lang="ts">
	import { buttonVariants } from "$components/ui/button";
	import { Collapsible } from "$components/ui/collapsible";
	import { cn } from "$lib/utils";
	import { writable } from "svelte/store";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let expandButtonTitle = "View Code";
	const open = writable(false);
</script>

<Collapsible {open}>
	<div
		class={cn("relative overflow-hidden rounded-md mb-4", className)}
		{...$$restProps}
	>
		<div class={cn("overflow-hidden h-full", !open && "max-h-32")}>
			<slot />
		</div>
		<div
			class={cn(
				"absolute flex items-center justify-center bg-gradient-to-b from-background/30 to-muted/90 p-2",
				open ? "inset-x-0 bottom-0 h-12" : "inset-0"
			)}
		>
			<span class={!$open ? "pt-4" : ""}>
				<Collapsible.Trigger
					class={cn(
						buttonVariants({ variant: "secondary" }),
						"h-8 text-xs"
					)}
				>
					{$open ? "Collapse" : expandButtonTitle}
				</Collapsible.Trigger>
			</span>
		</div>
	</div>
</Collapsible>
