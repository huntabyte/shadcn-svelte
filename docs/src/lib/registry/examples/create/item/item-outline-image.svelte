<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Example title="Outline - ItemMedia image">
	<div class="flex w-full flex-col gap-4">
		<Item.Root variant="outline">
			<Item.Media variant="image">
				<img
					src="https://avatar.vercel.sh/Project"
					alt="Project"
					width={40}
					height={40}
					class="object-cover grayscale"
				/>
			</Item.Media>
			<Item.Content>
				<Item.Title>Project Dashboard</Item.Title>
				<Item.Description>Overview of project settings and configuration.</Item.Description>
			</Item.Content>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Media variant="image">
				<img
					src="https://avatar.vercel.sh/Document"
					alt="Document"
					width={40}
					height={40}
					class="object-cover grayscale"
				/>
			</Item.Media>
			<Item.Content>
				<Item.Title>Document</Item.Title>
				<Item.Description>A document with metadata displayed.</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button variant="outline" size="sm">View</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Media variant="image">
				<img
					src="https://avatar.vercel.sh/File"
					alt="File"
					width={40}
					height={40}
					class="object-cover grayscale"
				/>
			</Item.Media>
			<Item.Content>
				<Item.Title>File Attachment</Item.Title>
				<Item.Description>
					Complete file with image, title, description, and action button.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="sm">Download</Button>
			</Item.Actions>
		</Item.Root>
	</div>
</Example>
