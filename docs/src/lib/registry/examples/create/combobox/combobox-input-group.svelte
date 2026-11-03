<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

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

	let inputValue = $state("");
	const filteredItems = $derived(
		timezones
			.map((group) => ({
				...group,
				items: group.items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase())),
			}))
			.filter((group) => group.items.length > 0)
	);
</script>

<Example title="Input Group">
	<Combobox.Root
		onOpenChangeComplete={(open) => {
			if (!open) inputValue = "";
		}}
	>
		<Combobox.Input
			oninput={(event) => (inputValue = event.currentTarget.value)}
			aria-label="Timezone"
			placeholder="Select a timezone"
			class="w-60"
		>
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
		<Combobox.Content avoidCollisions={false} alignOffset={-28} class="w-60 min-w-60">
			<Combobox.List>
				{#if filteredItems.length === 0}<Combobox.Empty>No items found.</Combobox.Empty>{/if}
				{#each filteredItems as group (group.value)}
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
</Example>
