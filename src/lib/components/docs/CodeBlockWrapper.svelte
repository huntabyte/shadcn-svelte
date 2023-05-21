<script lang="ts">
	import Button from "$components/ui/button/Button.svelte";
	import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "$components/ui/collapsible";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let expandButtonTitle = "View Code";
	let open = false;
</script>

<Collapsible {open}>
	<div class={cn("relative overflow-hidden", className)} {...$$restProps}>
		<CollapsibleContent class={cn("overflow-hidden", !open && "max-h-32")}>
			<div
				class={cn(
					"[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
					!open ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
				)}
			>
				<slot />
			</div>
		</CollapsibleContent>
		<div
			class={cn(
				"absolute flex items-center justify-center bg-gradient-to-b from-background/30 to-muted/90 p-2",
				open ? "inset-x-0 bottom-0 h-12" : "inset-0"
			)}
		>
			<CollapsibleTrigger>
				<Button variant="secondary" class="h-8 text-xs">
					{open ? "Collapse" : expandButtonTitle}
				</Button>
			</CollapsibleTrigger>
		</div>
	</div>
</Collapsible>
