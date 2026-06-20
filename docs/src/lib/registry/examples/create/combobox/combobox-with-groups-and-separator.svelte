<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const timezones = [
		{
			value: "Americas",
			items: [
				"(GMT-5) New York",
				"(GMT-8) Los Angeles",
				"(GMT-6) Chicago",
				"(GMT-5) Toronto",
				"(GMT-8) Vancouver",
				"(GMT-3) Sao Paulo",
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

<Example title="Groups">
	<Combobox.Root>
		<Combobox.Input placeholder="Select a timezone" />
		<Combobox.Content>
			<Combobox.List>
				{#each timezones as group, index (group.value)}
					<Combobox.Group>
						<Combobox.Label>{group.value}</Combobox.Label>
						{#each group.items as item (item)}
							<Combobox.Item value={item} label={item} />
						{/each}
					</Combobox.Group>
					{#if index < timezones.length - 1}
						<Combobox.Separator />
					{/if}
				{/each}
			</Combobox.List>
		</Combobox.Content>
	</Combobox.Root>
</Example>
