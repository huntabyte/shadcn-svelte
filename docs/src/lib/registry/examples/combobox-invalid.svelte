<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;
</script>

<Combobox.Root>
	<Combobox.Input placeholder="Select a framework" aria-invalid="true" />
	<Combobox.Content>
		<Combobox.List>
			{#each frameworks as framework (framework)}
				<Combobox.Item value={framework} label={framework} />
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
