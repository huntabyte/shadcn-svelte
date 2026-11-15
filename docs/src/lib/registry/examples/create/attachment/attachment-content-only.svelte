<script lang="ts">
	import * as Attachment from "$lib/registry/ui/attachment/index.js";
	import AttachmentRemove from "./attachment-remove.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Content Only" class="gap-8">
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Title</div>
		<div class="flex flex-col gap-3">
			{#each ["React Documentation", "Tailwind CSS"] as title (title)}
				<Attachment.Root class="w-full">
					<Attachment.Content><Attachment.Title>{title}</Attachment.Title></Attachment.Content>
					<Attachment.Actions>
						<AttachmentRemove label={`Remove ${title}`} />
					</Attachment.Actions>
				</Attachment.Root>
			{/each}
			<Attachment.Root size="sm" class="w-48">
				<Attachment.Content><Attachment.Title>shadcn/ui</Attachment.Title></Attachment.Content>
				<Attachment.Trigger>
					{#snippet child({ props })}
						<a
							href="https://ui.shadcn.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Open shadcn/ui"
							{...props}
						></a>
					{/snippet}
				</Attachment.Trigger>
			</Attachment.Root>
		</div>
	</div>
	<div class="flex w-full flex-col gap-2">
		<div class="px-1 text-xs font-medium text-muted-foreground">Title and Description</div>
		<div class="flex flex-col gap-3">
			<Attachment.Root class="w-full">
				<Attachment.Content>
					<Attachment.Title>Building accessible components</Attachment.Title>
					<Attachment.Description>react.dev · 8 min read</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<AttachmentRemove label="Remove Building accessible components" />
				</Attachment.Actions>
			</Attachment.Root>
			<Attachment.Root class="w-full">
				<Attachment.Content>
					<Attachment.Title>Utility-first CSS framework</Attachment.Title>
					<Attachment.Description>tailwindcss.com</Attachment.Description>
				</Attachment.Content>
				<Attachment.Actions>
					<AttachmentRemove label="Remove Utility-first CSS framework" />
				</Attachment.Actions>
			</Attachment.Root>
			<Attachment.Root size="sm" class="w-full max-w-80">
				<Attachment.Content>
					<Attachment.Title>Compound components in React</Attachment.Title>
					<Attachment.Description>ui.shadcn.com/docs</Attachment.Description>
				</Attachment.Content>
				<Attachment.Trigger>
					{#snippet child({ props })}
						<a
							href="https://ui.shadcn.com/docs"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Open Compound components in React"
							{...props}
						></a>
					{/snippet}
				</Attachment.Trigger>
			</Attachment.Root>
		</div>
	</div>
</Example>
