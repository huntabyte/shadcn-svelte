<script lang="ts">
	import { Combobox } from "$components/ui/combobox";
	import type { ComboboxFilterFunction } from "@melt-ui/svelte";
	const frameworks = [
		{
			value: "sveltekit",
			label: "SvelteKit"
		},
		{
			value: "next.js",
			label: "Next.js"
		},
		{
			value: "nuxt.js",
			label: "Nuxt.js"
		},
		{
			value: "remix",
			label: "Remix"
		},
		{
			value: "astro",
			label: "Astro"
		}
	];
	const filterFunction: ComboboxFilterFunction<
		(typeof frameworks)[number]
	> = (item, inputValue) => {
		// Example string normalization function. Replace as needed.
		const normalize = (str: string) => str.normalize().toLowerCase();
		const normalizedInput = normalize(inputValue);
		return (
			normalizedInput === "" ||
			normalize(item.label).includes(normalizedInput)
		);
	};

	const itemToString = (item: (typeof frameworks)[number]) => item.label;
</script>

<Combobox items={frameworks} {filterFunction} {itemToString} let:filteredItems>
	<Combobox.Trigger>Select a framework...</Combobox.Trigger>
	<Combobox.Content>
		<Combobox.Input slot="input" placeholder="Select an item" />
		{#each filteredItems as item, index}
			<Combobox.Item {item} {index}>
				{item.label}
			</Combobox.Item>
		{/each}
	</Combobox.Content>
</Combobox>
