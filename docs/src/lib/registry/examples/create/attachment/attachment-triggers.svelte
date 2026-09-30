<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	let isVisible = $state(true);
</script>

<Example title="Triggers" class="gap-3">
	{#if isVisible}
		<Attachment.Root class="w-full">
			<Attachment.Media>
				<IconPlaceholder
					lucide="FileTextIcon"
					tabler="IconFileText"
					hugeicons="FileIcon"
					phosphor="FileTextIcon"
					remixicon="RiFileTextLine"
				/>
			</Attachment.Media>
			<Attachment.Content>
				<Attachment.Title>contract-review.pdf</Attachment.Title>
				<Attachment.Description>PDF · 820 KB</Attachment.Description>
			</Attachment.Content>
			<Attachment.Actions>
				<Attachment.Action aria-label="Download attachment">
					<IconPlaceholder
						lucide="DownloadIcon"
						tabler="IconDownload"
						hugeicons="Download01Icon"
						phosphor="DownloadIcon"
						remixicon="RiDownloadLine"
					/>
				</Attachment.Action>
				<Attachment.Action aria-label="Remove attachment" onclick={() => (isVisible = false)}>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
					/>
				</Attachment.Action>
			</Attachment.Actions>
			<Attachment.Trigger>
				{#snippet child({ props })}
					<a
						href="#/"
						target="_blank"
						rel="noreferrer"
						aria-label="Open contract-review.pdf"
						{...props}
					></a>
				{/snippet}
			</Attachment.Trigger>
		</Attachment.Root>
	{:else}
		<Button variant="outline" onclick={() => (isVisible = true)}>Restore attachment</Button>
	{/if}
	<Dialog.Root>
		<Attachment.Root class="w-full">
			<Attachment.Media>
				<IconPlaceholder
					lucide="FileSearchIcon"
					tabler="IconFileSearch"
					hugeicons="FileSearchIcon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiFileSearchLine"
				/>
			</Attachment.Media>
			<Attachment.Content>
				<Attachment.Title>research-summary.pdf</Attachment.Title>
				<Attachment.Description>Open preview dialog</Attachment.Description>
			</Attachment.Content>
			<Attachment.Actions>
				<Attachment.Action aria-label="Copy link">
					<IconPlaceholder
						lucide="CopyIcon"
						tabler="IconCopy"
						hugeicons="Copy01Icon"
						phosphor="CopyIcon"
						remixicon="RiFileCopyLine"
					/>
				</Attachment.Action>
				<AttachmentRemove label="Remove research-summary.pdf" />
			</Attachment.Actions>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Attachment.Trigger {...props} aria-label="Preview research-summary.pdf" />
				{/snippet}
			</Dialog.Trigger>
		</Attachment.Root>
		<Dialog.Content class="sm:max-w-md">
			<Dialog.Header>
				<Dialog.Title>research-summary.pdf</Dialog.Title>
				<Dialog.Description>
					Attachment triggers can open dialogs while actions remain independently reachable.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</Example>
