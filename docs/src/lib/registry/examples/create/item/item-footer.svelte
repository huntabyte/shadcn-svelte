<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
</script>

<Example title="ItemFooter">
	<div class="flex w-full flex-col gap-4">
		<Item.Root>
			<Item.Content>
				<Item.Title>Quarterly Report Q4 2024</Item.Title>
				<Item.Description>
					Financial overview including revenue, expenses, and growth metrics for the
					fourth quarter.
				</Item.Description>
			</Item.Content>
			<Item.Footer>
				<span class="text-muted-foreground text-sm">Last updated 2 hours ago</span>
			</Item.Footer>
		</Item.Root>
		<Item.Root variant="outline">
			<Item.Content>
				<Item.Title>User Research Findings</Item.Title>
				<Item.Description>
					Insights from interviews and surveys conducted with 50+ users across different
					demographics.
				</Item.Description>
			</Item.Content>
			<Item.Footer>
				<span class="text-muted-foreground text-sm">Created by Sarah Chen</span>
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
				<span class="text-muted-foreground text-sm">12 comments</span>
			</Item.Footer>
		</Item.Root>
	</div>
</Example>
