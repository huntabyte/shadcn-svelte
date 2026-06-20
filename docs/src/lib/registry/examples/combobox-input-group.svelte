<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;
</script>

<Combobox.Root>
	<Combobox.Input placeholder="Select a framework">
		<InputGroup.Addon>
			<IconPlaceholder
				lucide="GlobeIcon"
				tabler="IconWorld"
				hugeicons="Globe02Icon"
				phosphor="GlobeIcon"
				remixicon="RiGlobalLine"
				class="text-muted-foreground"
			/>
		</InputGroup.Addon>
	</Combobox.Input>
	<Combobox.Content>
		<Combobox.List>
			{#each frameworks as framework (framework)}
				<Combobox.Item value={framework} label={framework} />
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
