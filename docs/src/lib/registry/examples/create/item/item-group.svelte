<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
</script>

<Example title="ItemGroup">
	<div class="flex w-full flex-col gap-4">
		<Item.Group>
			<Item.Root>
				<Item.Content>
					<Item.Title>Item 1</Item.Title>
					<Item.Description>First item in the group.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Root>
				<Item.Content>
					<Item.Title>Item 2</Item.Title>
					<Item.Description>Second item in the group.</Item.Description>
				</Item.Content>
			</Item.Root>
			<Item.Root>
				<Item.Content>
					<Item.Title>Item 3</Item.Title>
					<Item.Description>Third item in the group.</Item.Description>
				</Item.Content>
			</Item.Root>
		</Item.Group>
	</div>
</Example>
