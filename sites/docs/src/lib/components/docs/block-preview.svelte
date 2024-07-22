<script lang="ts">
	import type { PaneAPI } from "paneforge";
	import BlockToolbar from "./block-toolbar.svelte";
	import { config } from "$lib/stores/config.js";

	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import * as Resizable from "$lib/registry/new-york/ui/resizable/index.js";
	import { Icons } from "$lib/components/docs/icons/index.js";
	import type { Block } from "$lib/registry/schema.js";
	import { cn, getLiftMode, styleToString } from "$lib/utils.js";

	let isLoading = true;

	let resizablePaneRef: PaneAPI;

	export let block: Block;

	const { isLiftMode } = getLiftMode(block.name);

	$: tabStyle = block.container?.height
		? styleToString({ "--container-height": block.container.height })
		: "";
</script>

{#if $config.style === block.style}
	<Tabs.Root
		id={block.name}
		value="preview"
		class="relative grid w-full scroll-m-20 gap-4"
		style={tabStyle}
	>
		<BlockToolbar {block} {resizablePaneRef} />
		<Tabs.Content
			value="preview"
			class="after:bg-muted relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg"
		>
			<Resizable.PaneGroup direction="horizontal" class="relative z-10">
				<Resizable.Pane
					bind:pane={resizablePaneRef}
					class={cn(
						"bg-background relative rounded-lg border",
						$isLiftMode ? "border-border/50" : "border-border"
					)}
					defaultSize={100}
					minSize={30}
				>
					{#if isLoading}
						<div
							class="text-muted-foreground absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 text-sm"
						>
							<Icons.spinner class="h-4 w-4 animate-spin" />
							Loading...
						</div>
					{/if}
					<iframe
						src={`/blocks/${block.style}/${block.name}`}
						height={block.container?.height}
						class="chunk-mode bg-background relative z-20 w-full"
						on:load={() => {
							isLoading = false;
						}}
						title="Block preview"
					></iframe>
				</Resizable.Pane>
				<Resizable.Handle
					class={cn(
						"after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:transition-all after:hover:h-10 sm:block",
						$isLiftMode && "invisible"
					)}
				/>
				<Resizable.Pane defaultSize={0} minSize={0} />
			</Resizable.PaneGroup>
		</Tabs.Content>
		<Tabs.Content value="code">
			<div
				data-rehype-pretty-code-fragment
				class="w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html block.highlightedCode}
			</div>
		</Tabs.Content>
	</Tabs.Root>
{/if}
