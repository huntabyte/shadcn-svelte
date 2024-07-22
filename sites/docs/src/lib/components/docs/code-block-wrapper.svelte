<script lang="ts">
	import * as Collapsible from "$lib/registry/new-york/ui/collapsible/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let expandButtonTitle = "View Code";
	let open = false;
</script>

<Collapsible.Root bind:open>
	<div class={cn("relative overflow-hidden", className)} {...$$restProps}>
		<div class={cn("h-full overflow-hidden", !open && "max-h-32")}>
			<slot />
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
				<Collapsible.Trigger asChild let:builder>
					<Button variant="secondary" builders={[builder]} class="h-8 text-xs">
						{open ? "Collapse" : expandButtonTitle}
					</Button>
				</Collapsible.Trigger>
			</div>
		</div>
	</div>
</Collapsible.Root>
