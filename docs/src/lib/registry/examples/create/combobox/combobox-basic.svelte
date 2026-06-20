<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	let value = $state("");
	let inputValue = $state("");

	const filteredFrameworks = $derived(
		inputValue === ""
			? frameworks
			: frameworks.filter((framework) =>
					framework.toLowerCase().includes(inputValue.toLowerCase())
				)
	);
</script>

<Example title="Basic">
	<Combobox.Root
		bind:value
		{inputValue}
		onOpenChangeComplete={(open) => {
			if (!open) inputValue = "";
		}}
	>
		<Combobox.Input
			placeholder="Select a framework"
			oninput={(event) => (inputValue = event.currentTarget.value)}
		/>
		<Combobox.Content>
			<Combobox.List>
				{#each filteredFrameworks as framework (framework)}
					<Combobox.Item value={framework} label={framework} />
				{:else}
					<Combobox.Empty>No items found.</Combobox.Empty>
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
