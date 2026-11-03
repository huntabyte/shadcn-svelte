<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const states = [
		{
			state: "idle" as const,
			title: "selected-file.pdf",
			horizontalMeta: "Ready to upload",
			verticalMeta: "Ready",
			media: "clock" as const,
		},
		{
			state: "uploading" as const,
			title: "design-system.zip",
			horizontalMeta: "Uploading · 64%",
			verticalMeta: "Uploading",
			media: "spinner" as const,
		},
		{
			state: "processing" as const,
			title: "market-research.pdf",
			horizontalMeta: "Processing document",
			verticalMeta: "Processing",
			media: "file" as const,
		},
		{
			state: "error" as const,
			title: "financial-model.xlsx",
			horizontalMeta: "Upload failed. Try again.",
			verticalMeta: "Failed",
			media: "warning" as const,
		},
		{
			state: "done" as const,
			title: "uploaded-report.pdf",
			horizontalMeta: "Uploaded · 1.8 MB",
			verticalMeta: "Done",
			media: "check" as const,
		},
	];
</script>

{#snippet Media({ media }: { media: (typeof states)[number]["media"] })}
	{#if media === "spinner"}
		<Spinner />
	{:else if media === "clock"}
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
		/>
	{:else if media === "file"}
		<IconPlaceholder
			lucide="FileTextIcon"
			tabler="IconFileText"
			hugeicons="FileIcon"
			phosphor="FileTextIcon"
			remixicon="RiFileTextLine"
		/>
	{:else if media === "warning"}
		<IconPlaceholder
			lucide="FileWarningIcon"
			tabler="IconFileAlert"
			hugeicons="FileCorruptIcon"
			phosphor="FileXIcon"
			remixicon="RiFileWarningLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="CheckIcon"
			tabler="IconCheck"
			hugeicons="Tick02Icon"
			phosphor="CheckIcon"
			remixicon="RiCheckLine"
		/>
	{/if}
{/snippet}

{#snippet Retry()}
	<Attachment.Action aria-label="Retry upload">
		<IconPlaceholder
			lucide="RefreshCwIcon"
			tabler="IconRefresh"
			hugeicons="RefreshIcon"
			phosphor="ArrowClockwiseIcon"
			remixicon="RiRefreshLine"
		/>
	</Attachment.Action>
{/snippet}

<Example title="States" class="gap-8">
	<div class="flex w-full flex-col gap-3">
		<div class="px-1 text-xs font-medium text-muted-foreground">Horizontal</div>
		<div class="flex flex-col gap-2">
			{#each states as item (item.title + item.state)}
				<Attachment.Root state={item.state} class="w-full">
					<Attachment.Media>{@render Media({ media: item.media })}</Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{item.title}</Attachment.Title>
						<Attachment.Description>{item.horizontalMeta}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						{#if item.state === "error"}{@render Retry()}{/if}
						<AttachmentRemove
							label={item.state === "error" ? "Remove attachment" : `Remove ${item.title}`}
						/>
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col gap-3">
		<div class="px-1 text-xs font-medium text-muted-foreground">Vertical</div>
		<Attachment.Group class="w-full">
			{#each states as item (`v-${item.title}`)}
				<Attachment.Root state={item.state} orientation="vertical">
					<Attachment.Media>{@render Media({ media: item.media })}</Attachment.Media>
					<Attachment.Content>
						<Attachment.Title>{item.title}</Attachment.Title>
						<Attachment.Description>{item.verticalMeta}</Attachment.Description>
					</Attachment.Content>
					<Attachment.Actions>
						{#if item.state === "error"}
							<Attachment.Action aria-label={`Retry ${item.title}`}>
								<IconPlaceholder
									lucide="RefreshCwIcon"
									tabler="IconRefresh"
									hugeicons="RefreshIcon"
									phosphor="ArrowClockwiseIcon"
									remixicon="RiRefreshLine"
								/>
							</Attachment.Action>
						{/if}
						<AttachmentRemove label={`Remove ${item.title}`} />
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
		</Attachment.Group>
	</div>
</Example>
