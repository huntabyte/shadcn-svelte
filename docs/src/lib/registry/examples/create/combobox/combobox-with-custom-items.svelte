<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const countries = [
		{ code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
		{ code: "au", value: "australia", label: "Australia", continent: "Oceania" },
		{ code: "br", value: "brazil", label: "Brazil", continent: "South America" },
		{ code: "ca", value: "canada", label: "Canada", continent: "North America" },
		{ code: "fr", value: "france", label: "France", continent: "Europe" },
		{ code: "jp", value: "japan", label: "Japan", continent: "Asia" },
		{ code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
		{ code: "us", value: "united-states", label: "United States", continent: "North America" },
	] as const;

	let inputValue = $state("");
	const filteredItems = $derived(
		countries.filter((country) => country.label.toLowerCase().includes(inputValue.toLowerCase()))
	);
</script>

<Example title="Custom Items">
	<Combobox.Root
		onOpenChangeComplete={(open) => {
			if (!open) inputValue = "";
		}}
	>
		<Combobox.Input
			oninput={(event) => (inputValue = event.currentTarget.value)}
			aria-label="Country"
			placeholder="Search countries..."
		/>
		<Combobox.Content>
			<Combobox.List>
				{#if filteredItems.length === 0}<Combobox.Empty>No items found.</Combobox.Empty>{/if}
				{#each filteredItems as country (country.code)}
					<Combobox.Item value={country.value} label={country.label}>
						<Item.Root size="xs" class="p-0">
							<Item.Content>
								<Item.Title class="whitespace-nowrap">{country.label}</Item.Title>
								<Item.Description>{country.continent} ({country.code})</Item.Description>
							</Item.Content>
						</Item.Root>
					</Combobox.Item>
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
