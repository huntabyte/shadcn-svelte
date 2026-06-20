<script lang="ts">
	import * as Combobox from "$lib/registry/ui/combobox/index.js";

	const timezones = [
		{ value: "Americas", items: ["(GMT-5) New York", "(GMT-8) Los Angeles"] },
		{ value: "Europe", items: ["(GMT+0) London", "(GMT+1) Paris"] },
		{ value: "Asia/Pacific", items: ["(GMT+9) Tokyo", "(GMT+8) Singapore"] },
	] as const;
</script>

<Combobox.Root>
	<Combobox.Input placeholder="Select a timezone" />
	<Combobox.Content class="w-60">
		<Combobox.List>
			{#each timezones as group (group.value)}
				<Combobox.Group>
					<Combobox.Label>{group.value}</Combobox.Label>
					{#each group.items as item (item)}
						<Combobox.Item value={item} label={item} />
					{/each}
				</Combobox.Group>
			{/each}
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
