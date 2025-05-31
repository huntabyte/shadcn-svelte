<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const id = $props.id();

	const areas = [
		{
			label: "Team",
			value: "team",
		},
		{
			label: "Billing",
			value: "billing",
		},
		{
			label: "Account",
			value: "account",
		},
		{
			label: "Deployments",
			value: "deployments",
		},
		{
			label: "Support",
			value: "support",
		},
	];

	const levels = [
		{
			label: "Severity 1 (Highest)",
			value: "1",
		},
		{
			label: "Severity 2",
			value: "2",
		},
		{
			label: "Severity 3",
			value: "3",
		},
		{
			label: "Severity 4 (Lowest)",
			value: "4",
		},
	];

	let area = $state("billing");
	let level = $state("2");

	const areaLabel = $derived(areas.find((a) => a.value === area)?.label ?? "Select");
	const levelLabel = $derived(levels.find((l) => l.value === level)?.label ?? "Select Level");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Report an issue</Card.Title>
		<Card.Description>What area are you having problems with?</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-6">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="flex flex-col gap-3">
				<Label for="area-{id}">Area</Label>
				<Select.Root type="single" bind:value={area}>
					<Select.Trigger id="area-{id}" aria-label="Area" class="w-full">
						{areaLabel}
					</Select.Trigger>
					<Select.Content>
						{#each areas as area (area.value)}
							<Select.Item value={area.value}>{area.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-3">
				<Label for="level-{id}">Security Level</Label>
				<Select.Root type="single" bind:value={level}>
					<Select.Trigger
						id="level-{id}"
						class="w-full [&_span]:!block [&_span]:truncate"
						aria-label="Security Level"
					>
						<span>
							{levelLabel}
						</span>
					</Select.Trigger>
					<Select.Content>
						{#each levels as level (level.value)}
							<Select.Item value={level.value}>{level.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div class="flex flex-col gap-3">
			<Label for="subject-{id}">Subject</Label>
			<Input id="subject-{id}" placeholder="I need help with..." />
		</div>
		<div class="flex flex-col gap-3">
			<Label for="description-{id}">Description</Label>
			<Textarea
				id="description-{id}"
				placeholder="Please include all information relevant to your issue."
				class="min-h-28"
			/>
		</div>
	</Card.Content>
	<Card.Footer class="justify-end gap-2">
		<Button variant="ghost" size="sm">Cancel</Button>
		<Button size="sm">Submit</Button>
	</Card.Footer>
</Card.Root>
