<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const severities = [
		{ value: "critical", label: "Critical" },
		{ value: "high", label: "High" },
		{ value: "medium", label: "Medium" },
		{ value: "low", label: "Low" },
	];

	const components = [
		{ value: "dashboard", label: "Dashboard" },
		{ value: "auth", label: "Auth" },
		{ value: "api", label: "API" },
		{ value: "billing", label: "Billing" },
	];

	let severity = $state(severities[2].value);
	let component = $state(components[0].value);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Report Bug</Card.Title>
		<Card.Description>Help us fix issues faster.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field>
				<Field.Label for="bug-title">Title</Field.Label>
				<Input id="bug-title" placeholder="Brief description of the issue" />
			</Field.Field>
			<div class="grid grid-cols-2 gap-3">
				<Field.Field>
					<Field.Label for="bug-severity">Severity</Field.Label>
					<Select.Root type="single" bind:value={severity}>
						<Select.Trigger id="bug-severity" class="w-full">
							{severities.find((s) => s.value === severity)?.label ??
								"Select Severity"}
						</Select.Trigger>
						<Select.Content>
							{#each severities as severity (severity.value)}
								<Select.Item value={severity.value}>{severity.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>
				<Field.Field>
					<Field.Label for="bug-component">Component</Field.Label>
					<Select.Root type="single" bind:value={component}>
						<Select.Trigger id="bug-component" class="w-full">
							{components.find((c) => c.value === component)?.label ??
								"Select Component"}
						</Select.Trigger>
						<Select.Content>
							{#each components as component (component.value)}
								<Select.Item value={component.value}>{component.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>
			</div>
			<Field.Field>
				<Field.Label for="bug-steps">Steps to reproduce</Field.Label>
				<Textarea
					id="bug-steps"
					placeholder="1. Go to&#10;2. Click on&#10;3. Observe..."
					class="min-h-24 resize-none"
				/>
			</Field.Field>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal" class="justify-end">
			<Button variant="outline">Attach File</Button>
			<Button>Submit Bug</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
