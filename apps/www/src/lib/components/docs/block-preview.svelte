<script lang="ts">
	import CircleHelp from "lucide-svelte/icons/circle-help";
	import Info from "lucide-svelte/icons/info";
	import Monitor from "lucide-svelte/icons/monitor";
	import Smartphone from "lucide-svelte/icons/smartphone";
	import Tablet from "lucide-svelte/icons/tablet";

	import { config } from "$lib/stores/config.js";

	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import * as Resizable from "$lib/registry/new-york/ui/resizable/index.js";
	import StyleSwitcher from "./style-switcher.svelte";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { Icons } from "$lib/components/docs/icons/index.js";
	import BlockCopyCodeButton from "../block-copy-code-button.svelte";
	import type { PaneAPI } from "paneforge";
	import type { Block } from "$lib/registry/schema.js";

	let isLoading = true;

	let ref: PaneAPI;

	export let block: Block;
</script>

{#if $config.style === block.style}
	<Tabs.Root id={block.name} value="preview" class="relative grid w-full scroll-m-20 gap-4">
		<div class="flex flex-col items-center gap-4 sm:flex-row">
			<div class="flex items-center gap-2">
				<Tabs.List class="hidden sm:flex">
					<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
					<Tabs.Trigger value="code">Code</Tabs.Trigger>
				</Tabs.List>
				<div class="hidden items-center gap-2 sm:flex">
					<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
					<div class="flex items-center gap-2">
						<a href={`#${block.name}`}>
							<Badge variant="outline">{block.name}</Badge>
						</a>
						<Popover.Root>
							<Popover.Trigger
								class="hidden text-muted-foreground hover:text-foreground sm:flex"
							>
								<Info class="h-3.5 w-3.5" />
								<span class="sr-only">Block description</span>
							</Popover.Trigger>
							<Popover.Content side="right" sideOffset={10} class="text-sm">
								{block.description}
							</Popover.Content>
						</Popover.Root>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-2 pr-[14px] sm:ml-auto">
				<div
					class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex"
				>
					<ToggleGroup.Root
						type="single"
						value="100"
						onValueChange={(value) => {
							if (ref && value) {
								ref.resize(parseInt(value));
							}
						}}
					>
						<ToggleGroup.Item value="100" class="h-[22px] w-[22px] rounded-sm p-0">
							<Monitor class="h-3.5 w-3.5" />
						</ToggleGroup.Item>
						<ToggleGroup.Item value="60" class="h-[22px] w-[22px] rounded-sm p-0">
							<Tablet class="h-3.5 w-3.5" />
						</ToggleGroup.Item>
						<ToggleGroup.Item value="25" class="h-[22px] w-[22px] rounded-sm p-0">
							<Smartphone class="h-3.5 w-3.5" />
						</ToggleGroup.Item>
					</ToggleGroup.Root>
				</div>
				<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
				<StyleSwitcher class="h-7" />
				<Popover.Root>
					<Popover.Trigger
						class="hidden text-muted-foreground hover:text-foreground sm:flex"
					>
						<CircleHelp class="h-3.5 w-3.5" />
						<span class="sr-only">Block description</span>
					</Popover.Trigger>
					<Popover.Content
						side="top"
						sideOffset={20}
						class="space-y-3 rounded-[0.5rem] text-sm"
					>
						<p class="font-medium">
							What is the difference between the New York and Default style?
						</p>
						<p>
							A style comes with its own set of components, animations, icons and
							more.
						</p>
						<p>
							The <span class="font-medium">Default</span> style has larger inputs, uses
							lucide-react for icons and tailwindcss-animate for animations.
						</p>
						<p>
							The <span class="font-medium">New York</span> style ships with smaller buttons
							and inputs. It also uses shadows on cards and buttons.
						</p>
					</Popover.Content>
				</Popover.Root>
				<Separator orientation="vertical" class="mx-2 h-4" />
				<BlockCopyCodeButton code={block.code} />
			</div>
		</div>
		<Tabs.Content
			value="preview"
			class="relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg after:bg-muted"
		>
			<Resizable.PaneGroup direction="horizontal" class="relative z-10">
				<Resizable.Pane
					bind:pane={ref}
					class="relative rounded-lg border bg-background transition-all"
					defaultSize={100}
					minSize={25}
				>
					{#if isLoading}
						<div
							class="absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 text-sm text-muted-foreground"
						>
							<Icons.spinner class="h-4 w-4 animate-spin" />
							Loading...
						</div>
					{/if}
					<iframe
						src={`/blocks/${block.style}/${block.name}`}
						height={block.container?.height}
						class="relative z-20 w-full bg-background"
						on:load={() => {
							isLoading = false;
						}}
						title="Block preview"
					/>
				</Resizable.Pane>
				<Resizable.Handle
					class="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block"
				/>
				<Resizable.Pane defaultSize={0} minSize={0} />
			</Resizable.PaneGroup>
		</Tabs.Content>
		<Tabs.Content value="code">
			<div
				data-rehype-pretty-code-fragment
				class="w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
			>
				{@html block.highlightedCode}
			</div>
		</Tabs.Content>
	</Tabs.Root>
{/if}
