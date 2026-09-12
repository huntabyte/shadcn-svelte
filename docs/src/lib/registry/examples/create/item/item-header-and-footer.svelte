<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="ItemHeader + ItemFooter">
	<Item.Root>
		<Item.Header>
			<span class="text-sm font-medium">Team Project</span>
		</Item.Header>
		<Item.Content>
			<Item.Title>Website Redesign</Item.Title>
			<Item.Description>
				Complete overhaul of the company website with modern design principles and improved user
				experience.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">Updated 5 minutes ago</span>
		</Item.Footer>
	</Item.Root>
	<Item.Root variant="outline">
		<Item.Header>
			<span class="text-sm font-medium">Client Work</span>
		</Item.Header>
		<Item.Content>
			<Item.Title>Mobile App Development</Item.Title>
			<Item.Description>
				Building a cross-platform mobile application for iOS and Android with React Native.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">Status: In Progress</span>
		</Item.Footer>
	</Item.Root>
	<Item.Root variant="muted">
		<Item.Header>
			<span class="text-sm font-medium">Documentation</span>
		</Item.Header>
		<Item.Content>
			<Item.Title>API Integration Guide</Item.Title>
			<Item.Description>
				Step-by-step instructions for integrating third-party APIs with authentication and error
				handling.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">Category: Technical • 3 attachments</span>
		</Item.Footer>
	</Item.Root>
</Example>
