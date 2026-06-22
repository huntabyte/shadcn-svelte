<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	type Country = {
		code: string;
		value: string;
		label: string;
		continent: string;
	};

	const countries: Country[] = [
		{
			code: "",
			value: "select-country",
			continent: "",
			label: "Select country",
		},
		{
			code: "ar",
			value: "argentina",
			label: "Argentina",
			continent: "South America",
		},
		{ code: "au", value: "australia", label: "Australia", continent: "Oceania" },
		{ code: "br", value: "brazil", label: "Brazil", continent: "South America" },
		{ code: "ca", value: "canada", label: "Canada", continent: "North America" },
		{ code: "cn", value: "china", label: "China", continent: "Asia" },
		{
			code: "co",
			value: "colombia",
			label: "Colombia",
			continent: "South America",
		},
		{ code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
		{ code: "fr", value: "france", label: "France", continent: "Europe" },
		{ code: "de", value: "germany", label: "Germany", continent: "Europe" },
		{ code: "it", value: "italy", label: "Italy", continent: "Europe" },
		{ code: "jp", value: "japan", label: "Japan", continent: "Asia" },
		{ code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
		{ code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
		{
			code: "nz",
			value: "new-zealand",
			label: "New Zealand",
			continent: "Oceania",
		},
		{ code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
		{
			code: "za",
			value: "south-africa",
			label: "South Africa",
			continent: "Africa",
		},
		{ code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
		{
			code: "gb",
			value: "united-kingdom",
			label: "United Kingdom",
			continent: "Europe",
		},
		{
			code: "us",
			value: "united-states",
			label: "United States",
			continent: "North America",
		},
	] as const;

	let value = $state(countries[0].value);
	let open = $state(false);
	let triggerRef = $state<HTMLElement | null>(null);
	const selectedCountry = $derived(
		countries.find((country) => country.value === value) ?? countries[0]
	);

	function handleValueChange(nextValue: string) {
		value = nextValue;
		open = false;
	}
</script>

<Combobox.Root bind:value bind:open onValueChange={handleValueChange}>
	<Combobox.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				bind:ref={triggerRef}
				variant="outline"
				class="w-64 justify-between font-normal"
			>
				{selectedCountry.label}
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconSelector"
					hugeicons="UnfoldMoreIcon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					class="text-muted-foreground pointer-events-none size-4"
				/>
			</Button>
		{/snippet}
	</Combobox.Trigger>
	<Combobox.Content customAnchor={triggerRef}>
		<Combobox.Input showTrigger={false} placeholder="Search" />
		<Combobox.Empty>No items found.</Combobox.Empty>
		<Combobox.List>
			{#each countries as country (country.code)}
				<Combobox.Item value={country.value} label={country.label}>
					{country.label}
				</Combobox.Item>
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
