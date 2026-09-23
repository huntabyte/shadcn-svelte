<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";

	const timezones = [
		{
			label: "North America",
			options: [
				{ value: "est", label: "Eastern Standard Time (EST)" },
				{ value: "cst", label: "Central Standard Time (CST)" },
				{ value: "mst", label: "Mountain Standard Time (MST)" },
				{ value: "pst", label: "Pacific Standard Time (PST)" },
				{ value: "akst", label: "Alaska Standard Time (AKST)" },
				{ value: "hst", label: "Hawaii Standard Time (HST)" },
			],
		},
		{
			label: "Europe & Africa",
			options: [
				{ value: "gmt", label: "Greenwich Mean Time (GMT)" },
				{ value: "cet", label: "Central European Time (CET)" },
				{ value: "eet", label: "Eastern European Time (EET)" },
				{ value: "west", label: "Western European Summer Time (WEST)" },
				{ value: "cat", label: "Central Africa Time (CAT)" },
				{ value: "eat", label: "East Africa Time (EAT)" },
			],
		},
		{
			label: "Asia",
			options: [
				{ value: "msk", label: "Moscow Time (MSK)" },
				{ value: "ist", label: "India Standard Time (IST)" },
				{ value: "cst_china", label: "China Standard Time (CST)" },
				{ value: "jst", label: "Japan Standard Time (JST)" },
				{ value: "kst", label: "Korea Standard Time (KST)" },
				{ value: "ist_indonesia", label: "Indonesia Central Standard Time (WITA)" },
			],
		},
		{
			label: "Australia & Pacific",
			options: [
				{ value: "awst", label: "Australian Western Standard Time (AWST)" },
				{ value: "acst", label: "Australian Central Standard Time (ACST)" },
				{ value: "aest", label: "Australian Eastern Standard Time (AEST)" },
				{ value: "nzst", label: "New Zealand Standard Time (NZST)" },
				{ value: "fjt", label: "Fiji Time (FJT)" },
			],
		},
		{
			label: "South America",
			options: [
				{ value: "art", label: "Argentina Time (ART)" },
				{ value: "bot", label: "Bolivia Time (BOT)" },
				{ value: "brt", label: "Brasilia Time (BRT)" },
				{ value: "clt", label: "Chile Standard Time (CLT)" },
			],
		},
	];

	const items = timezones.flatMap((group) => group.options);
</script>

<Select.Root type="single" {items}>
	<Select.Trigger class="w-[280px]">
		<Select.Value placeholder="Select a timezone" />
	</Select.Trigger>
	<Select.Content class="max-h-[300px]">
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
