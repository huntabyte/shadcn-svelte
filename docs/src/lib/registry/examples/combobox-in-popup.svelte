<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const countries = [
		{ code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
		{ code: "au", value: "australia", label: "Australia", continent: "Oceania" },
		{ code: "br", value: "brazil", label: "Brazil", continent: "South America" },
		{ code: "ca", value: "canada", label: "Canada", continent: "North America" },
		{ code: "cn", value: "china", label: "China", continent: "Asia" },
		{ code: "co", value: "colombia", label: "Colombia", continent: "South America" },
		{ code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
		{ code: "fr", value: "france", label: "France", continent: "Europe" },
		{ code: "de", value: "germany", label: "Germany", continent: "Europe" },
		{ code: "it", value: "italy", label: "Italy", continent: "Europe" },
		{ code: "jp", value: "japan", label: "Japan", continent: "Asia" },
		{ code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
		{ code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
		{ code: "nz", value: "new-zealand", label: "New Zealand", continent: "Oceania" },
		{ code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
		{ code: "za", value: "south-africa", label: "South Africa", continent: "Africa" },
		{ code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
		{ code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
		{ code: "us", value: "united-states", label: "United States", continent: "North America" },
	] as const;

	let value = $state("");
	const selectedCountry = $derived(
		countries.find((country) => country.value === value)?.label ?? "Select country"
	);
</script>

<Combobox.Root bind:value>
	<Combobox.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" class="w-64 justify-between font-normal">
				{selectedCountry}
			</Button>
		{/snippet}
	</Combobox.Trigger>
	<Combobox.Content>
		<Combobox.Input showTrigger={false} placeholder="Search" />
		<Combobox.Empty>No items found.</Combobox.Empty>
		<Combobox.List>
			{#each countries as country (country.value)}
				<Combobox.Item value={country.value} label={country.label}>
					{country.label}
				</Combobox.Item>
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
