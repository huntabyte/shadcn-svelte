<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
</script>

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-3"
	data-x-chunk-description="A card with a form to edit the product status"
>
	<Card.Header>
		<Card.Title>Product Status</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="status">Status</Label>
				<Select.Root>
					<Select.Trigger id="status" aria-label="Select status">
						<Select.Value placeholder="Select status" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="draft" label="Draft">Draft</Select.Item>
						<Select.Item value="published" label="Active">Active</Select.Item>
						<Select.Item value="archived" label="Archived">Archived</Select.Item
						>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</Card.Content>
</Card.Root>
