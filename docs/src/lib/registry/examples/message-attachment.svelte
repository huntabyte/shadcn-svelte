<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Message.Root align="end">
		<Message.Content>
			<div class="bg-muted overflow-hidden rounded-xl border">
				<img
					src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
					alt="Workspace"
					class="aspect-video w-full object-cover"
				/>
			</div>
			<Bubble.Root>
				<Bubble.Content
					>Here is the image. Can you add it to the PDF cover page?</Bubble.Content
				>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
	<Message.Root>
		<Message.Content>
			<Bubble.Root variant="muted">
				<Bubble.Content>Done. Here is the PDF with the image added.</Bubble.Content>
			</Bubble.Root>
			<div class="bg-background flex items-center gap-3 rounded-xl border p-3 text-sm">
				<div class="bg-muted flex size-10 items-center justify-center rounded-lg">PDF</div>
				<div class="min-w-0 flex-1">
					<div class="truncate font-medium">sales-dashboard.pdf</div>
					<div class="text-muted-foreground text-xs">PDF - 2.4 MB</div>
				</div>
			</div>
		</Message.Content>
	</Message.Root>
</div>
