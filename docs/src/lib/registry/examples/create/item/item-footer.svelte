<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="ItemFooter">
	<Item.Root>
		<Item.Content>
			<Item.Title>Quarterly Report Q4 2024</Item.Title>
			<Item.Description>
				Financial overview including revenue, expenses, and growth metrics for the fourth quarter.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">Last updated 2 hours ago</span>
		</Item.Footer>
	</Item.Root>
	<Item.Root variant="outline">
		<Item.Content>
			<Item.Title>User Research Findings</Item.Title>
			<Item.Description>
				Insights from interviews and surveys conducted with 50+ users across different demographics.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">Created by Sarah Chen</span>
		</Item.Footer>
	</Item.Root>
	<Item.Root variant="muted">
		<Item.Content>
			<Item.Title>Product Roadmap</Item.Title>
			<Item.Description>
				Planned features and improvements scheduled for the next three months.
			</Item.Description>
		</Item.Content>
		<Item.Footer>
			<span class="text-sm text-muted-foreground">12 comments</span>
		</Item.Footer>
	</Item.Root>
</Example>
