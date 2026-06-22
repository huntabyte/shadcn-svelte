<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";

	const timezones = [
		{
			value: "Americas",
			items: [
				"(GMT-5) New York",
				"(GMT-8) Los Angeles",
				"(GMT-6) Chicago",
				"(GMT-5) Toronto",
				"(GMT-8) Vancouver",
				"(GMT-3) São Paulo",
			],
		},
		{
			value: "Europe",
			items: [
				"(GMT+0) London",
				"(GMT+1) Paris",
				"(GMT+1) Berlin",
				"(GMT+1) Rome",
				"(GMT+1) Madrid",
				"(GMT+1) Amsterdam",
			],
		},
		{
			value: "Asia/Pacific",
			items: [
				"(GMT+9) Tokyo",
				"(GMT+8) Shanghai",
				"(GMT+8) Singapore",
				"(GMT+4) Dubai",
				"(GMT+11) Sydney",
				"(GMT+9) Seoul",
			],
		},
	] as const;
</script>

<Combobox.Root>
	<Combobox.Input placeholder="Select a timezone" class="w-60">
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
	<Combobox.Content avoidCollisions={false} class="w-60 min-w-60">
		<Combobox.Empty>No timezones found.</Combobox.Empty>
		<Combobox.List>
			{#each timezones as group (group.value)}
				<Combobox.Group>
					<Combobox.Label>{group.value}</Combobox.Label>
					{#each group.items as item (item)}
						<Combobox.Item value={item} label={item}>
							{item}
						</Combobox.Item>
					{/each}
				</Combobox.Group>
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
