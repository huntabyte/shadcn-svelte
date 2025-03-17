<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import Fullscreen from "@lucide/svelte/icons/fullscreen";
	import Monitor from "@lucide/svelte/icons/monitor";
	import Smartphone from "@lucide/svelte/icons/smartphone";
	import Tablet from "@lucide/svelte/icons/tablet";
	import Terminal from "@lucide/svelte/icons/terminal";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import * as ToggleGroup from "$lib/registry/new-york/ui/toggle-group/index.js";
	import type { Block } from "$lib/registry/schema.js";
	import type { ResizablePane } from "$lib/registry/new-york/ui/resizable/index.js";
	import { CopyToClipboard } from "$lib/utils/copy-to-clipboard.svelte.js";
	import { getCommand, getPackageManager } from "$lib/stores/package-manager.js";

	let { block, resizablePaneRef }: { block: Block; resizablePaneRef: ResizablePane } = $props();

	const copier = new CopyToClipboard();
	const selectedPackageManager = getPackageManager();

	const addCommand = $derived(
		getCommand($selectedPackageManager, "execute", `shadcn-svelte@next add ${block.name}`)
	);

	const command = $derived(addCommand.command + " " + addCommand.args.join(" "));

	const blockSource = $derived(
		`https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/new-york/block/${block.name}`
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
				<Check />
			{:else}
				<Terminal />
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
					<Monitor class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="60"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Tablet"
				>
					<Tablet class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item
					value="30"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Mobile"
				>
					<Smartphone class="h-3.5 w-3.5" />
				</ToggleGroup.Item>
				<Separator orientation="vertical" class="h-4" />
				<Button
					size="icon"
					variant="ghost"
					class="h-[22px] w-[22px] rounded-sm p-0"
					title="Open in New Tab"
					href={`/blocks/${block.style}/${block.name}`}
					target="_blank"
				>
					<span class="sr-only">Open in New Tab</span>
					<Fullscreen class="h-3.5 w-3.5" />
				</Button>
			</ToggleGroup.Root>
		</div>
		<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
		<Button
			aria-label="View block source code"
			href={blockSource}
			target="_blank"
			class="z-50 h-[calc(theme(spacing.7)_-_1px)] gap-1 rounded-[6px] px-0 text-xs"
			variant="link"
		>
			View source
		</Button>
	</div>
</div>
