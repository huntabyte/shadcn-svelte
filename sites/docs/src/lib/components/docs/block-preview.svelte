<script lang="ts">
	import BlockToolbar from "./block-toolbar.svelte";
	import { config } from "$lib/stores/config.js";

	import * as Resizable from "$lib/registry/new-york/ui/resizable/index.js";
	import * as Icon from "$lib/components/docs/icons/index.js";
	import type { Block } from "$lib/registry/schema.js";

	let isLoading = $state(true);
	let resizablePaneRef = $state<Resizable.Pane>(null!);

	let { block }: { block: Block } = $props();
</script>

{#if $config.style === block.style}
	<div
		id={block.name}
		class="relative grid w-full scroll-m-20 gap-4"
		style="--container-height: {block.container?.height ?? ''};"
	>
		<BlockToolbar {block} {resizablePaneRef} />
		<Resizable.PaneGroup direction="horizontal" class="relative z-10">
			<Resizable.Pane
				bind:this={resizablePaneRef}
				class="bg-background relative aspect-[4/2.5] rounded-lg border md:aspect-auto"
				defaultSize={100}
				minSize={30}
			>
				{#if isLoading}
					<div
						class="text-muted-foreground absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 text-sm"
					>
						<Icon.Spinner class="size-4 animate-spin" />
						Loading...
					</div>
				{/if}
				<img
					src="/images/blocks/{block.name}.png"
					alt={block.name}
					data-block={block.name}
					width={1440}
					height={900}
					class="bg-background absolute left-0 top-0 z-20 w-[970px] max-w-none data-[block=sidebar-10]:left-auto data-[block=sidebar-10]:right-0 data-[block=sidebar-11]:-top-1/3 data-[block=sidebar-14]:left-auto data-[block=sidebar-14]:right-0 data-[block=login-01]:max-w-full data-[block=sidebar-13]:max-w-full data-[block=sidebar-15]:max-w-full sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
				/>
				<img
					src="/images/blocks/{block.name}-dark.png"
					alt={block.name}
					data-block={block.name}
					width={1440}
					height={900}
					class="bg-background absolute left-0 top-0 z-20 hidden w-[970px] max-w-none data-[block=sidebar-10]:left-auto data-[block=sidebar-10]:right-0 data-[block=sidebar-11]:-top-1/3 data-[block=sidebar-14]:left-auto data-[block=sidebar-14]:right-0 data-[block=login-01]:max-w-full data-[block=sidebar-13]:max-w-full data-[block=sidebar-15]:max-w-full sm:w-[1280px] md:hidden dark:block md:dark:hidden"
				/>
				<iframe
					src={`/blocks/${block.style}/${block.name}`}
					height={block.container?.height}
					class="chunk-mode bg-background relative z-20 hidden w-full md:block"
					onload={() => {
						isLoading = false;
					}}
					title="Block preview"
				></iframe>
			</Resizable.Pane>
			<Resizable.Handle
				class="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:transition-all after:hover:h-10 sm:block"
			/>
			<Resizable.Pane defaultSize={0} minSize={0} />
		</Resizable.PaneGroup>
	</div>
{/if}
