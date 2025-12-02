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
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import { getCommand } from "$lib/package-manager.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	const ctx = BlockViewerContext.get();
	const userConfig = UserConfigContext.get();

	const clipboard = new UseClipboard();

	const addCommand = $derived(
		getCommand(
			userConfig.current.packageManager,
			"execute",
			`shadcn-svelte@latest add ${ctx.item.name}`
		)
	);

	const command = $derived(addCommand.command + " " + addCommand.args.join(" "));
</script>

<div class="hidden w-full items-center gap-2 ps-2 md:pe-6 lg:flex">
	<Tabs.Root bind:value={ctx.view} class="hidden lg:flex">
		<Tabs.List
			class="grid h-8 grid-cols-2 items-center rounded-md p-1 *:data-[slot=tabs-trigger]:h-6 *:data-[slot=tabs-trigger]:rounded-sm *:data-[slot=tabs-trigger]:px-2 *:data-[slot=tabs-trigger]:text-xs"
		>
			<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			<Tabs.Trigger value="code">Code</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<Separator orientation="vertical" class="mx-2 !h-4" />
	<a
		href="#{ctx.item.name}"
		class="flex-1 text-center text-sm font-medium underline-offset-2 hover:underline md:flex-auto md:text-start"
	>
		{ctx.item.description?.replace(/\.$/, "")}
	</a>
	<div class="ms-auto flex items-center gap-2">
		<div class="h-8 items-center gap-1.5 rounded-md border p-1 shadow-none">
			<ToggleGroup.Root
				type="single"
				value="100"
				onValueChange={(value) => {
					if (ctx.resizablePaneRef) {
						ctx.resizablePaneRef.resize(parseInt(value));
					}
				}}
				class="gap-1 *:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm"
			>
				<ToggleGroup.Item value="100" title="Desktop">
					<MonitorIcon />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="60" title="Tablet">
					<TabletIcon />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="30" title="Mobile">
					<SmartphoneIcon />
				</ToggleGroup.Item>
				<Separator orientation="vertical" class="!h-4" />
				<Button
					size="icon"
					variant="ghost"
					class="size-6 rounded-sm p-0"
					title="Open in New Tab"
					href="/view/{ctx.item.name}"
					target="_blank"
				>
					<span class="sr-only">Open in New Tab</span>
					<FullscreenIcon />
				</Button>
				<Separator orientation="vertical" class="!h-4" />
				<Button
					size="icon"
					variant="ghost"
					class="size-6 rounded-sm p-0"
					title="Refresh Preview"
					onclick={() => {
						ctx.iframeKey = ctx.iframeKey + 1;
					}}
				>
					<RotateCcwIcon />
					<span class="sr-only">Refresh Preview</span>
				</Button>
			</ToggleGroup.Root>
		</div>
		<Separator orientation="vertical" class="mx-1 !h-4" />
		<Button
			variant="outline"
			class="w-fit gap-1 px-2 shadow-none"
			size="sm"
			onclick={() => clipboard.copy(command)}
		>
			{#if clipboard.copied}
				<CheckIcon />
			{:else}
				<TerminalIcon />
			{/if}
			<span class="hidden lg:inline">{command}</span>
		</Button>
	</div>
</div>
