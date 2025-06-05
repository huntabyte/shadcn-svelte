<script lang="ts">
	import { BlockViewerContext } from "./block-viewer.svelte";
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
	import { IsMounted } from "runed";

	const ctx = BlockViewerContext.get();

	const mounted = new IsMounted();
</script>

<div class="group-data-[view=code]/block-view-wrapper:hidden md:h-[calc(var(--height)+10px)]">
	<div class="grid w-full gap-4">
		<Resizable.PaneGroup direction="horizontal" class="relative z-10">
			<Resizable.Pane
				bind:this={ctx.resizablePaneRef}
				class="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
				defaultSize={100}
				minSize={30}
			>
				<img
					src="/img/registry/{ctx.item.name}-light.png"
					alt={ctx.item.name}
					data-block={ctx.item.name}
					width={1440}
					height={900}
					loading="lazy"
					class="object-cover md:hidden dark:hidden md:dark:hidden"
				/>
				<img
					src="/img/registry/{ctx.item.name}-dark.png"
					alt={ctx.item.name}
					data-block={ctx.item.name}
					width={1440}
					height={900}
					loading="lazy"
					class="hidden object-cover md:hidden dark:block md:dark:hidden"
				/>
				{#if !ctx.lazy || mounted.current}
					<iframe
						title={ctx.item.name}
						src="/view/{ctx.item.name}"
						height={930}
						loading="lazy"
						class="bg-background no-scrollbar relative z-20 hidden w-full md:block"
					></iframe>
				{:else}
					<div
						class="bg-background no-scrollbar relative z-20 hidden h-[930px] w-full md:block"
					></div>
				{/if}
			</Resizable.Pane>
			<Resizable.Handle
				class="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:transition-all after:hover:h-10 md:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
</div>
