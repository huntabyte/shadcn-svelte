<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;
</script>

<Example title="Invalid">
	<Combobox.Root>
		<Combobox.Input aria-label="Framework" placeholder="Select a framework" aria-invalid="true" />
		<Combobox.Content>
			<Combobox.List>
				{#each frameworks as framework (framework)}
					<Combobox.Item value={framework} label={framework} />
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
