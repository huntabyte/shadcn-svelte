<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	let status = $state("");
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
				<Select.Root type="single" bind:value={status}>
					<Select.Trigger id="status" aria-label="Select status" class="capitalize">
						{status ?? "Select status"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="draft" label="Draft" />
						<Select.Item value="published" label="Active" />
						<Select.Item value="archived" label="Archived" />
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</Card.Content>
</Card.Root>
