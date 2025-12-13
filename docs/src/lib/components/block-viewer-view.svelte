<script lang="ts">
	import { BlockViewerContext } from "./block-viewer.svelte";
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
	import BlockViewerIframe from "./block-viewer-iframe.svelte";

	const ctx = BlockViewerContext.get();

	// const iframeHtml = `<iframe title="${ctx.item.name}" src="/view/${ctx.item.name}" height="930" class="bg-background no-scrollbar relative z-20 hidden w-full md:block"></iframe>`;
</script>

<div class="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex">
	<div class="relative grid w-full gap-4">
		<div
			class="absolute inset-0 end-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
		></div>
		<Resizable.PaneGroup
			direction="horizontal"
			class="after:bg-surface/50 relative z-10 after:absolute after:inset-0 after:end-3 after:z-0 after:rounded-xl"
		>
			<Resizable.Pane
				bind:this={ctx.resizablePaneRef}
				class="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
				defaultSize={100}
				minSize={30}
			>
				<BlockViewerIframe />
			</Resizable.Pane>
			<Resizable.Handle
				class="after:bg-border relative z-20 hidden w-3 bg-transparent p-0 after:absolute after:end-0 after:top-1/2 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
</div>
