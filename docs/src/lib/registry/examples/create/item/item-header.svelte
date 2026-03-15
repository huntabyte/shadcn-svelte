<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
</script>

<Example title="ItemHeader">
	<div class="flex w-full flex-col gap-4">
		<Item.Root>
			<Item.Header>
				<span class="text-sm font-medium">Design System</span>
			</Item.Header>
			<Item.Content>
				<Item.Title>Component Library</Item.Title>
				<Item.Description>
					A comprehensive collection of reusable UI components for building consistent
					interfaces.
				</Item.Description>
			</Item.Content>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Header>
				<span class="text-sm font-medium">Marketing</span>
			</Item.Header>
			<Item.Content>
				<Item.Title>Campaign Analytics</Item.Title>
				<Item.Description>
					Track performance metrics and engagement rates across all marketing channels.
				</Item.Description>
			</Item.Content>
		</Item.Root>
		<Item.Root variant="muted">
			<Item.Header>
				<span class="text-sm font-medium">Engineering</span>
			</Item.Header>
			<Item.Content>
				<Item.Title>API Documentation</Item.Title>
				<Item.Description>
					Complete reference guide for all available endpoints and authentication methods.
				</Item.Description>
			</Item.Content>
		</Item.Root>
	</div>
</Example>
