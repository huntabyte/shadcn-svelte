<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import FullscreenIcon from "@lucide/svelte/icons/fullscreen";
	import MonitorIcon from "@lucide/svelte/icons/monitor";
	import SmartphoneIcon from "@lucide/svelte/icons/smartphone";
	import TabletIcon from "@lucide/svelte/icons/tablet";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import type { Block } from "$lib/blocks.js";
	import type { ResizablePane } from "$lib/registry/ui/resizable/index.js";
	import { CopyToClipboard } from "$lib/utils/copy-to-clipboard.svelte.js";
	import { PackageManagerContext, getCommand } from "$lib/package-manager.js";

	let { block, resizablePaneRef }: { block: Block; resizablePaneRef: ResizablePane } = $props();

	const copier = new CopyToClipboard();
	const pm = PackageManagerContext.get();

	const addCommand = $derived(
		getCommand(pm.current, "execute", `shadcn-svelte@next add ${block.name}`)
	);

	const command = $derived(addCommand.command + " " + addCommand.args.join(" "));

	const blockSource = $derived(
		`https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/blocks/${block.name}`
	);
</script>

<div class="flex items-center gap-2 md:gap-4">
	<Button href={`#${block.name}`} variant="link" class="whitespace-normal px-1 md:px-2">
		{block.description}
	</Button>
	<div class="ml-auto hidden items-center gap-2 md:flex md:pr-[14px]">
		<Button
			variant="ghost"
			class="bg-muted h-7 rounded-md border shadow-none"
			size="sm"
			onclick={() => {
				copier.copyToClipboard(command);
			}}
		>
			{#if copier.isCopied}
				<CheckIcon />
			{:else}
				<TerminalIcon />
			{/if}
			{command}
		</Button>
		<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
		<div class="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none md:flex">
			<ToggleGroup.Root
				type="single"
				value="100"
				onValueChange={(value) => {
					if (resizablePaneRef) {
						resizablePaneRef.resize(parseInt(value));
					}
				}}
			>
				<ToggleGroup.Item
					value="100"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Desktop"
				>
					<MonitorIcon class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="60"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Tablet"
				>
					<TabletIcon class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="30"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Mobile"
				>
					<SmartphoneIcon class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<Separator orientation="vertical" class="h-4" />
				<Button
					size="icon"
					variant="ghost"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Open in New Tab"
					href={`/blocks/${block.name}`}
					target="_blank"
				>
					<span class="sr-only">Open in New Tab</span>
					<FullscreenIcon class="h-3.5 w-3.5" />
				</Button>
			</ToggleGroup.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
		<Button
			aria-label="View block source code"
			href={blockSource}
			target="_blank"
			class="h-[calc(theme(spacing.7)_-_1px)] gap-1 rounded-[6px] px-0 text-xs"
			variant="link"
		>
			View source
		</Button>
	</div>
</div>
