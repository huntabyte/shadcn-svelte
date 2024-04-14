<script lang="ts">
	import { nanoid } from "nanoid";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import * as Select from "$lib/registry/default/ui/select/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import { Textarea } from "$lib/registry/default/ui/textarea/index.js";

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

	const id = nanoid(5);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Report an issue</Card.Title>
		<Card.Description>What area are you having problems with?</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="grid gap-2">
				<Label for="aria-{id}">Area</Label>
				<Select.Root selected={areas[1]}>
					<Select.Trigger id="aria-{id}">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content>
						{#each areas as area}
							<Select.Item value={area.value} label={area.label}
								>{area.label}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="security-level-{id}">Security Level</Label>
				<Select.Root selected={securityLevels[1]}>
					<Select.Trigger id="security-level-{id}" class="w-full truncate">
						<Select.Value placeholder="Select level" />
					</Select.Trigger>
					<Select.Content>
						{#each securityLevels as level}
							<Select.Item value={level.value} label={level.label}
								>{level.label}</Select.Item
							>
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
				name="description-{id}"
				placeholder="Please include all information relevant to your issue."
			/>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between space-x-2">
		<Button variant="ghost">Cancel</Button>
		<Button>Submit</Button>
	</Card.Footer>
</Card.Root>
