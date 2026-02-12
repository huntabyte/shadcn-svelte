<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Table from "$lib/registry/ui/table/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";

	const people = [
		{ value: "sarah", label: "Sarah Chen" },
		{ value: "marcus", label: "Marc Rodriguez" },
		{ value: "emily", label: "Emily Watson" },
		{ value: "david", label: "David Kim" },
	];

	const tasks = [
		{
			task: "Design homepage",
			assignee: "sarah",
			status: "In Progress",
		},
		{
			task: "Implement API",
			assignee: "marcus",
			status: "Pending",
		},
		{
			task: "Write tests",
			assignee: "emily",
			status: "Not Started",
		},
	];
</script>

<Example title="With Select">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Task</Table.Head>
				<Table.Head>Assignee</Table.Head>
				<Table.Head>Status</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each tasks as item (item.task)}
				{@const assigneePerson = people.find((person) => person.value === item.assignee)}
				{@const assigneeLabel = assigneePerson?.label ?? ""}
				<Table.Row>
					<Table.Cell class="font-medium">{item.task}</Table.Cell>
					<Table.Cell>
						<Select.Root type="single" value={item.assignee}>
							<Select.Trigger class="w-40" size="sm">
								{assigneeLabel}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each people as person (person.value)}
										<Select.Item value={person.value}
											>{person.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</Table.Cell>
					<Table.Cell>{item.status}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</Example>
