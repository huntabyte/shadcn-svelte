<script lang="ts">
	import { tick } from "svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	type Country = {
		code: string;
		value: string;
		label: string;
		continent: string;
	};

	const countries: Country[] = [
		{
			code: "",
			value: "",
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
	let inputRef = $state<HTMLInputElement | null>(null);
	let open = $state(false);
	let triggerRef = $state<HTMLElement | null>(null);
	const selectedCountry = $derived(
		countries.find((country) => country.value === value) ?? countries[0]
	);

	function handleValueChange(nextValue: string) {
		value = nextValue;
		open = false;
		inputValue = "";
		void tick().then(() => triggerRef?.focus());
	}

	let inputValue = $state("");
	const filteredItems = $derived(
		countries.filter(
			(country) =>
				country.value !== "" && country.label.toLowerCase().includes(inputValue.toLowerCase())
		)
	);
</script>

<Example title="Popup">
	<Combobox.Root
		bind:value
		bind:open
		onValueChange={handleValueChange}
		onOpenChange={(nextOpen) => {
			if (nextOpen) void tick().then(() => inputRef?.focus());
			else {
				inputValue = "";
				triggerRef?.focus();
			}
		}}
	>
		<Combobox.Trigger
			bind:ref={triggerRef}
			class={cn(buttonVariants({ variant: "outline" }), "w-64 justify-between font-normal")}
		>
			{selectedCountry.label}
		</Combobox.Trigger>
		<Combobox.Content customAnchor={triggerRef}>
			<Combobox.Input
				bind:ref={inputRef}
				showTrigger={false}
				oninput={(event) => (inputValue = event.currentTarget.value)}
				aria-label="Country"
				placeholder="Search"
			/>
			<Combobox.List>
				{#if filteredItems.length === 0}<Combobox.Empty>No items found.</Combobox.Empty>{/if}
				{#each filteredItems as country (country.code)}
					<Combobox.Item value={country.value} label={country.label}>
						{country.label}
					</Combobox.Item>
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
