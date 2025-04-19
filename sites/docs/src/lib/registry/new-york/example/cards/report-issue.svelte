<script lang="ts">
	import { useId } from "bits-ui";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	const areas = [
		{
			value: "team",
			label: "Team",
		},
		{
			value: "billing",
			label: "Billing",
		},
		{
			value: "account",
			label: "Account",
		},
		{
			value: "deployments",
			label: "Deployments",
		},
		{
			value: "support",
			label: "Support",
		},
	];

	const securityLevels = [
		{
			value: "1",
			label: "Severity 1 (Highest)",
		},
		{
			value: "2",
			label: "Severity 2",
		},
		{
			value: "3",
			label: "Severity 3",
		},
		{
			value: "4",
			label: "Severity 4 (Lowest)",
		},
	];

	const id = useId("report-issue");
	let securityLevel = $state(securityLevels[1].value);
	const securityLevelLabel = $derived(
		securityLevels.find((l) => l.value === securityLevel)?.label ?? "Select level"
	);
	let area = $state(areas[1].value);
	const areaLabel = $derived(areas.find((a) => a.value === area)?.label ?? "Select");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Report an issue</Card.Title>
		<Card.Description>What area are you having problems with?</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="grid gap-2">
				<Label for="area-{id}">Area</Label>
				<Select.Root type="single" bind:value={area}>
					<Select.Trigger id="area-{id}">
						{areaLabel}
					</Select.Trigger>
					<Select.Content>
						{#each areas as area (area.value)}
							<Select.Item value={area.value} label={area.label} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="security-level-{id}">Security Level</Label>
				<Select.Root type="single" bind:value={securityLevel}>
					<Select.Trigger id="security-level-{id}" class="w-full truncate">
						{securityLevelLabel}
					</Select.Trigger>
					<Select.Content>
						{#each securityLevels as level (level.value)}
							<Select.Item value={level.value} label={level.label} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="subject-{id}">Subject</Label>
			<Input id="subject-{id}" name="subject-{id}" placeholder="I need help with..." />
		</div>
		<div class="grid gap-2">
			<Label for="description-{id}">Description</Label>
			<Textarea
				id="description-{id}"
				placeholder="Please include all information relevant to your issue."
			/>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between space-x-2">
		<Button variant="ghost">Cancel</Button>
		<Button>Submit</Button>
	</Card.Footer>
</Card.Root>
