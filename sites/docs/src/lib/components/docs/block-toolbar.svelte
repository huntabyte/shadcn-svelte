<script lang="ts">
	import CircleHelp from "lucide-svelte/icons/circle-help";
	import Monitor from "lucide-svelte/icons/monitor";
	import Smartphone from "lucide-svelte/icons/smartphone";
	import Tablet from "lucide-svelte/icons/tablet";

	import type { PaneAPI } from "paneforge";
	import BlockCopyCodeButton from "./block-copy-code-button.svelte";
	import StyleSwitcher from "./style-switcher.svelte";
	import { cn, getLiftMode } from "$lib/utils.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { Switch } from "$lib/registry/new-york/ui/switch/index.js";
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
	import type { Block } from "$lib/registry/schema.js";

	export let block: Block;
	export let resizablePaneRef: PaneAPI;

	const { isLiftMode, toggleLiftMode } = getLiftMode(block.name);
</script>

<div class="flex flex-col items-center gap-4 sm:flex-row">
	<div class="flex items-center gap-2">
		<Tabs.List
			class="hidden h-7 rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] sm:flex"
		>
			<Tabs.Trigger
				value="preview"
				class="h-[1.45rem] rounded-sm px-2 text-xs"
				disabled={$isLiftMode}
			>
				Preview
			</Tabs.Trigger>
			<Tabs.Trigger
				value="code"
				class="h-[1.45rem] rounded-sm px-2 text-xs"
				disabled={$isLiftMode}
			>
				Code
			</Tabs.Trigger>
		</Tabs.List>
		<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
		<StyleSwitcher class="h-[calc(theme(spacing.7)_-_1px)] dark:h-7" disabled={$isLiftMode} />
		<Popover.Root>
			<Popover.Trigger
				disabled={$isLiftMode}
				class="text-muted-foreground hover:text-foreground hidden disabled:opacity-50 sm:flex"
			>
				<CircleHelp class="h-3.5 w-3.5" />
				<span class="sr-only">Block description</span>
			</Popover.Trigger>
			<Popover.Content side="top" sideOffset={20} class="space-y-3 rounded-[0.5rem] text-sm">
				<p class="font-medium">
					What is the difference between the New York and Default style?
				</p>
				<p>A style comes with its own set of components, animations, icons and more.</p>
				<p>
					The <span class="font-medium">Default</span> style has larger inputs, uses lucide-svelte
					for icons and tailwindcss-animate for animations.
				</p>
				<p>
					The <span class="font-medium">New York</span> style ships with smaller buttons and
					inputs. It also uses shadows on cards and buttons.
				</p>
			</Popover.Content>
		</Popover.Root>
		<div class="hidden items-center gap-2 sm:flex">
			<Separator orientation="vertical" class="mx-2 mr-0 hidden h-4 md:flex" />
			<div class="flex items-center gap-2">
				<a href={`#${block.name}`}>
					<Badge
						variant="secondary"
						class={cn("bg-transparent", isLiftMode && "opacity-50")}
					>
						{block.name}
					</Badge>
				</a>
			</div>
		</div>
	</div>
	{#if block.code}
		<div class="flex items-center gap-2 pr-[14px] sm:ml-auto">
			{#if block.chunks.length > 0}
				<div class="flex h-7 items-center justify-between gap-2">
					<Label for="lift-mode" class="text-xs">Lift Mode</Label>
					<Switch
						id="lift-mode"
						checked={$isLiftMode}
						onCheckedChange={() => {
							resizablePaneRef.resize(100);
							toggleLiftMode(block.name);
						}}
					/>
				</div>
				<Separator orientation="vertical" class="mx-2 hidden h-4 lg:inline-flex" />
			{/if}

			<div
				class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex"
			>
				<ToggleGroup.Root
					disabled={$isLiftMode}
					type="single"
					value="100"
					onValueChange={(value) => {
						if (resizablePaneRef && value !== undefined) {
							resizablePaneRef.resize(Number.parseInt(value));
						}
					}}
				>
					<ToggleGroup.Item value="100" class="h-[22px] w-[22px] rounded-sm p-0">
						<Monitor class="h-3.5 w-3.5" />
					</ToggleGroup.Item>
					<ToggleGroup.Item value="60" class="h-[22px] w-[22px] rounded-sm p-0">
						<Tablet class="h-3.5 w-3.5" />
					</ToggleGroup.Item>
					<ToggleGroup.Item value="30" class="h-[22px] w-[22px] rounded-sm p-0">
						<Smartphone class="h-3.5 w-3.5" />
					</ToggleGroup.Item>
				</ToggleGroup.Root>
			</div>
			<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
			<BlockCopyCodeButton name={block.name} code={block.code} disabled={$isLiftMode} />
		</div>
	{/if}
</div>
