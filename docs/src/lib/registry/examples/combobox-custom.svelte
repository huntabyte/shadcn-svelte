<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const countries = [
		{ value: "argentina", label: "Argentina" },
		{ value: "australia", label: "Australia" },
		{ value: "brazil", label: "Brazil" },
		{ value: "canada", label: "Canada" },
		{ value: "france", label: "France" },
		{ value: "japan", label: "Japan" },
	] as const;
</script>

<Combobox.Root>
	<Combobox.Input placeholder="Search countries..." />
	<Combobox.Content>
		<Combobox.List>
			{#each countries as country (country.value)}
				<Combobox.Item value={country.value} label={country.label} />
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
