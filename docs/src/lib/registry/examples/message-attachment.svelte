<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message.Root align="end">
		<Message.Content>
			<Attachment.Root orientation="vertical">
				<Attachment.Media variant="image">
					<img
						src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
						alt="Workspace"
					/>
				</Attachment.Media>
			</Attachment.Root>
			<Bubble.Root>
				<Bubble.Content>
					Here's the image. Can you add it to the PDF? Use it for the cover page.
				</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Content>
			<Bubble.Root variant="muted">
				<Bubble.Content>
					Done. Here's the PDF with the image added as the cover page.
				</Bubble.Content>
			</Bubble.Root>
			<Attachment.Root>
				<Attachment.Media>
					<FileTextIcon />
				</Attachment.Media>
				<Attachment.Content>
					<Attachment.Title>sales-dashboard.pdf</Attachment.Title>
					<Attachment.Description>PDF · 2.4 MB</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<Attachment.Action
						type="button"
						title="Download"
						aria-label="Download"
						size="icon-sm"
						variant="secondary"
					>
						<DownloadIcon />
					</Attachment.Action>
				</Attachment.Actions>
			</Attachment.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root align="end">
		<Message.Content>
			<Bubble.Root>
				<Bubble.Content>Thanks. Looks good.</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
</div>
