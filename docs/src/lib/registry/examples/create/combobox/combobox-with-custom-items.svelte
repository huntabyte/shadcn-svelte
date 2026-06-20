<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";

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
</script>

<Example title="Custom items">
	<Combobox.Root>
		<Combobox.Input placeholder="Search countries..." />
		<Combobox.Content>
			<Combobox.List>
				{#each countries as country (country.code)}
					<Combobox.Item value={country.value} label={country.label}>
						<Item.Root size="xs" class="p-0">
							<Item.Content>
								<Item.Title class="whitespace-nowrap">{country.label}</Item.Title>
								<Item.Description
									>{country.continent} ({country.code})</Item.Description
								>
							</Item.Content>
						</Item.Root>
					</Combobox.Item>
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
