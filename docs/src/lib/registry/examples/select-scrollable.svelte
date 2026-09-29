<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const timezones = [
		{
			label: "North America",
			options: [
				{ value: "est", label: "Eastern Standard Time" },
				{ value: "cst", label: "Central Standard Time" },
				{ value: "mst", label: "Mountain Standard Time" },
				{ value: "pst", label: "Pacific Standard Time" },
				{ value: "akst", label: "Alaska Standard Time" },
				{ value: "hst", label: "Hawaii Standard Time" },
			],
		},
		{
			label: "Europe & Africa",
			options: [
				{ value: "gmt", label: "Greenwich Mean Time" },
				{ value: "cet", label: "Central European Time" },
				{ value: "eet", label: "Eastern European Time" },
				{ value: "west", label: "Western European Summer Time" },
				{ value: "cat", label: "Central Africa Time" },
				{ value: "eat", label: "East Africa Time" },
			],
		},
		{
			label: "Asia",
			options: [
				{ value: "msk", label: "Moscow Time" },
				{ value: "ist", label: "India Standard Time" },
				{ value: "cst_china", label: "China Standard Time" },
				{ value: "jst", label: "Japan Standard Time" },
				{ value: "kst", label: "Korea Standard Time" },
				{ value: "ist_indonesia", label: "Indonesia Central Standard Time" },
			],
		},
		{
			label: "Australia & Pacific",
			options: [
				{ value: "awst", label: "Australian Western Standard Time" },
				{ value: "acst", label: "Australian Central Standard Time" },
				{ value: "aest", label: "Australian Eastern Standard Time" },
				{ value: "nzst", label: "New Zealand Standard Time" },
				{ value: "fjt", label: "Fiji Time" },
			],
		},
		{
			label: "South America",
			options: [
				{ value: "art", label: "Argentina Time" },
				{ value: "bot", label: "Bolivia Time" },
				{ value: "brt", label: "Brasilia Time" },
				{ value: "clt", label: "Chile Standard Time" },
			],
		},
	];

	const items = timezones.flatMap((group) => group.options);
</script>

<Select.Root type="single" {items}>
	<Select.Trigger class="w-full max-w-64">
		<Select.Value placeholder="Select a timezone" />
	</Select.Trigger>
	<Select.Content>
		{#each timezones as group (group.label)}
			<Select.Group>
				<Select.Label>{group.label}</Select.Label>
				{#each group.options as option (option.value)}
					<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
				{/each}
			</Select.Group>
		{/each}
	</Select.Content>
</Select.Root>
