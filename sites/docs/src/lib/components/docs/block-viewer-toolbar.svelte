<script lang="ts">
	import { BlockViewerContext } from "./block-viewer.svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import MonitorIcon from "@lucide/svelte/icons/monitor";
	import TabletIcon from "@lucide/svelte/icons/tablet";
	import SmartphoneIcon from "@lucide/svelte/icons/smartphone";
	import FullscreenIcon from "@lucide/svelte/icons/fullscreen";
	import CheckIcon from "@lucide/svelte/icons/check";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { getCommand, getPackageManager } from "$lib/stores/package-manager.js";

	const ctx = BlockViewerContext.get();

	const clipboard = new UseClipboard();

	const agent = getPackageManager();

	const addCommand = $derived(
		getCommand($agent, "execute", `shadcn-svelte@next add ${ctx.item.name}`)
	);

	const command = $derived(addCommand.command + " " + addCommand.args.join(" "));
</script>

<div class="flex w-full items-center gap-2 md:pr-[14px]">
	<Tabs.Root bind:value={ctx.view} class="hidden lg:flex">
		<Tabs.List
			class="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]"
		>
			<Tabs.Trigger value="preview" class="h-[1.45rem] rounded-sm px-2 text-xs">
				Preview
			</Tabs.Trigger>
			<Tabs.Trigger value="code" class="h-[1.45rem] rounded-sm px-2 text-xs">
				Code
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<Separator orientation="vertical" class="mx-2 hidden h-4 lg:flex" />
	<a href={`#${ctx.item.name}`} class="text-sm font-medium underline-offset-2 hover:underline">
		{ctx.item.description}
	</a>
	<div class="ml-auto hidden items-center gap-2 md:flex">
		<div class="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
			<ToggleGroup.Root
				type="single"
				value="100"
				onValueChange={(value) => {
					if (ctx.resizablePaneRef) {
						ctx.resizablePaneRef.resize(parseInt(value));
					}
				}}
			>
				<ToggleGroup.Item
					value="100"
					class="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
					title="Desktop"
				>
					<MonitorIcon class="size-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="60"
					class="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
					title="Tablet"
				>
					<TabletIcon class="size-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="30"
					class="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
					title="Mobile"
				>
					<SmartphoneIcon class="size-3.5" />
				</ToggleGroup.Item>
				<Separator orientation="vertical" class="!h-4 w-px" />
				<Button
					size="icon"
					variant="ghost"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Open in New Tab"
					href="/view/{ctx.item.name}"
					target="_blank"
				>
					<span class="sr-only">Open in New Tab</span>
					<FullscreenIcon class="size-3.5" />
				</Button>
			</ToggleGroup.Root>
		</div>
		<Separator orientation="vertical" class="mx-1 hidden h-4 md:flex" />
		<div class="flex h-7 items-center gap-1 rounded-md border p-[2px]">
			<Button
				variant="ghost"
				class="hidden h-[22px] w-auto gap-1 rounded-sm px-2 md:flex lg:w-auto"
				size="sm"
				onclick={() => {
					// todo make this use the right pm command
					clipboard.copy(command);
				}}
			>
				{#if clipboard.copied}
					<CheckIcon />
				{:else}
					<TerminalIcon />
				{/if}
				<span class="hidden lg:inline">{command}</span>
			</Button>
		</div>
		<Separator orientation="vertical" class="mx-1 hidden h-4 xl:flex" />
	</div>
</div>
