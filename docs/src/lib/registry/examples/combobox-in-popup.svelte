<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const countries = [
		{ value: "argentina", label: "Argentina" },
		{ value: "australia", label: "Australia" },
		{ value: "brazil", label: "Brazil" },
		{ value: "canada", label: "Canada" },
		{ value: "france", label: "France" },
		{ value: "japan", label: "Japan" },
		{ value: "united-states", label: "United States" },
	] as const;

	let value = $state(countries[0].value);
	const selectedCountry = $derived(countries.find((country) => country.value === value)?.label);
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
		<Combobox.List>
			{#each countries as country (country.value)}
				<Combobox.Item value={country.value} label={country.label} />
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
