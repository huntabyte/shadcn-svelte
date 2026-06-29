<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileArchiveIcon from "@lucide/svelte/icons/file-archive";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import PresentationIcon from "@lucide/svelte/icons/presentation";
</script>

<Example title="Attachment Group">
	<div class="flex w-full max-w-sm flex-col gap-8">
		<Message.Root align="end">
			<Message.Content>
				<Attachment.Group class="w-[80%]">
					<Attachment.Root orientation="vertical">
						<Attachment.Media variant="image">
							<img
								src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
								alt="Workspace"
							/>
						</Attachment.Media>
					</Attachment.Root>
					<Attachment.Root orientation="vertical">
						<Attachment.Media variant="image">
							<img
								src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80"
								alt="Desk"
							/>
						</Attachment.Media>
					</Attachment.Root>
					<Attachment.Root orientation="vertical">
						<Attachment.Media variant="image">
							<img
								src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80"
								alt="Office"
							/>
						</Attachment.Media>
					</Attachment.Root>
				</Attachment.Group>
				<Bubble.Root>
					<Bubble.Content>
						Here are the brand photos. Can you add them to the deck?
					</Bubble.Content>
				</Bubble.Root>
			</Message.Content>
		</Message.Root>
		<Message.Root>
			<Message.Content>
				<Bubble.Root variant="muted">
					<Bubble.Content>
						Done. Here's the draft deck and the exported assets.
					</Bubble.Content>
				</Bubble.Root>
				<Attachment.Group class="w-full">
					<Attachment.Root class="w-64">
						<Attachment.Media>
							<FileTextIcon />
						</Attachment.Media>
						<Attachment.Content>
							<Attachment.Title>brand-deck.pdf</Attachment.Title>
							<Attachment.Description>PDF · 3.1 MB</Attachment.Description>
						</Attachment.Content>
						<Attachment.Actions>
							<Attachment.Action
								type="button"
								title="Download"
								aria-label="Download brand-deck.pdf"
								size="icon-sm"
								variant="secondary"
							>
								<DownloadIcon />
							</Attachment.Action>
						</Attachment.Actions>
					</Attachment.Root>
					<Attachment.Root class="w-64">
						<Attachment.Media>
							<PresentationIcon />
						</Attachment.Media>
						<Attachment.Content>
							<Attachment.Title>brand-deck.key</Attachment.Title>
							<Attachment.Description>Keynote · 9 MB</Attachment.Description>
						</Attachment.Content>
						<Attachment.Actions>
							<Attachment.Action
								type="button"
								title="Download"
								aria-label="Download brand-deck.key"
								size="icon-sm"
								variant="secondary"
							>
								<DownloadIcon />
							</Attachment.Action>
						</Attachment.Actions>
					</Attachment.Root>
					<Attachment.Root class="w-64">
						<Attachment.Media>
							<FileArchiveIcon />
						</Attachment.Media>
						<Attachment.Content>
							<Attachment.Title>brand-assets.zip</Attachment.Title>
							<Attachment.Description>ZIP · 4.2 MB</Attachment.Description>
						</Attachment.Content>
						<Attachment.Actions>
							<Attachment.Action
								type="button"
								title="Download"
								aria-label="Download brand-assets.zip"
								size="icon-sm"
								variant="secondary"
							>
								<DownloadIcon />
							</Attachment.Action>
						</Attachment.Actions>
					</Attachment.Root>
				</Attachment.Group>
			</Message.Content>
		</Message.Root>
	</div>
</Example>
