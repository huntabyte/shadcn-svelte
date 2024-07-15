<script lang="ts">
	import * as Collapsible from "$lib/registry/new-york/ui/collapsible/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let {
		class: className,
		expandButtonTitle = "View Code",
		children,
		...restProps
	}: PrimitiveDivAttributes & {
		expandButtonTitle?: string;
	} = $props();

	let open = $state(false);
</script>

<Collapsible.Root bind:open>
	<div class={cn("relative overflow-hidden", className)} {...restProps}>
		<div class={cn("h-full overflow-hidden", !open && "max-h-32")}>
			{@render children?.()}
		</div>
		<div
			class={cn(
				"[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
				open ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
			)}
		>
			<div
				class={cn(
					"absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2",
					open ? "inset-x-0 bottom-0 h-12" : "inset-0"
				)}
			>
				<Collapsible.Trigger
					class={cn(buttonVariants({ variant: "secondary", class: "h-8 text-xs" }))}
				>
					{open ? "Collapse" : expandButtonTitle}
				</Collapsible.Trigger>
			</div>
		</div>
	</div>
</Collapsible.Root>
