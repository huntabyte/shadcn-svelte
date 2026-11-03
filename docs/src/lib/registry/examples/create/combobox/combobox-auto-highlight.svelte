<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
	let value = $state("SvelteKit");
	let inputValue = $state("");
	const filteredItems = $derived(
		frameworks.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
	);
</script>

<Example title="Auto Highlight">
	<Combobox.Root
		bind:value
		onOpenChangeComplete={(open) => {
			if (!open) inputValue = "";
		}}
	>
		<Combobox.Input
			defaultValue="SvelteKit"
			aria-label="Framework"
			placeholder="Select a framework"
			oninput={(event) => (inputValue = event.currentTarget.value)}
		/>
		<Combobox.Content>
			<Combobox.List>
				{#each filteredItems as framework (framework)}
					<Combobox.Item value={framework} label={framework} />
				{:else}
					<Combobox.Empty>No items found.</Combobox.Empty>
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
