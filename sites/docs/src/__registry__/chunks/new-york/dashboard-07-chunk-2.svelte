<script lang="ts">
	import * as Card from "$lib/registry/new-york/ui/card/index.js";

	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	let category = $state("");
	let subCategory = $state("");
</script>

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-2"
	data-x-chunk-description="A card with a form to edit the product category and subcategory"
>
	<Card.Header>
		<Card.Title>Product Category</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6 sm:grid-cols-3">
			<div class="grid gap-3">
				<Label for="category">Category</Label>
				<Select.Root type="single" bind:value={category}>
					<Select.Trigger id="category" aria-label="Select category" class="capitalize">
						{category ?? "Select category"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="clothing" label="Clothing" />
						<Select.Item value="electronics" label="Electronics" />
						<Select.Item value="accessories" label="Accessories" />
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="subcategory">Subcategory (optional)</Label>
				<Select.Root type="single" bind:value={subCategory}>
					<Select.Trigger id="subcategory" aria-label="Select subcategory">
						{subCategory ?? "Select subcategory"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="t-shirts" label="T-Shirts" />
						<Select.Item value="hoodies" label="Hoodies" />
						<Select.Item value="sweatshirts" label="Sweatshirts" />
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</Card.Content>
</Card.Root>
