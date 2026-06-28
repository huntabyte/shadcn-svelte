<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import FileSearchIcon from "@lucide/svelte/icons/file-search";
	import XIcon from "@lucide/svelte/icons/x";
</script>

<div class="mx-auto w-full max-w-sm py-12">
	<Dialog.Root>
		<Attachment.Root class="w-full">
			<Attachment.Media>
				<FileSearchIcon />
			</Attachment.Media>
			<Attachment.Content>
				<Attachment.Title>research-summary.pdf</Attachment.Title>
				<Attachment.Description>Open preview dialog</Attachment.Description>
			</Attachment.Content>
			<Attachment.Actions>
				<Attachment.Action aria-label="Copy link">
					<CopyIcon />
				</Attachment.Action>
				<Attachment.Action aria-label="Remove research-summary.pdf">
					<XIcon />
				</Attachment.Action>
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
					The attachment trigger fills the card and opens the dialog, while the actions
					stay independently clickable above it.
				</Dialog.Description>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>
