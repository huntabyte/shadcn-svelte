<script lang="ts">
	import { buttonVariants } from "$components/ui/button";
	import {
		Collapsible,
		CollapsibleTrigger
	} from "$components/ui/collapsible";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let expandButtonTitle = "View Code";
	let open = false;
</script>

<Collapsible bind:open>
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
			<span class={!open ? "pt-4" : ""}>
				<CollapsibleTrigger
					class={cn(
						buttonVariants({ variant: "secondary" }),
						"h-8 text-xs"
					)}
				>
					{open ? "Collapse" : expandButtonTitle}
				</CollapsibleTrigger>
			</span>
		</div>
	</div>
</Collapsible>
