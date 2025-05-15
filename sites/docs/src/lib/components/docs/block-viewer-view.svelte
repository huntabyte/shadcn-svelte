<script lang="ts">
	import { BlockViewerContext } from "./block-viewer.svelte";
	import * as Resizable from "$lib/registry/ui/resizable/index.js";

	const ctx = BlockViewerContext.get();
</script>

<div class="group-data-[view=code]/block-view-wrapper:hidden md:h-[--height]">
	<div class="grid w-full gap-4">
		<Resizable.PaneGroup direction="horizontal" class="relative z-10">
			<Resizable.Pane
				bind:this={ctx.resizablePaneRef}
				class="bg-background relative aspect-[4/2.5] rounded-xl border md:aspect-auto"
				defaultSize={100}
				minSize={30}
			>
				<img
					src="/r/{ctx.item.name}-light.png"
					alt={ctx.item.name}
					data-block={ctx.item.name}
					width={1440}
					height={900}
					class="object-cover md:hidden dark:hidden md:dark:hidden"
				/>
				<img
					src="/r/{ctx.item.name}-dark.png"
					alt={ctx.item.name}
					data-block={ctx.item.name}
					width={1440}
					height={900}
					class="hidden object-cover md:hidden dark:block md:dark:hidden"
				/>
				<iframe
					title={ctx.item.name}
					src="/view/{ctx.item.name}"
					height={ctx.item.meta?.iframeHeight ?? 930}
					class="bg-background relative z-20 hidden w-full md:block"
				></iframe>
			</Resizable.Pane>
			<Resizable.Handle
				class="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:transition-all after:hover:h-10 md:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
</div>
