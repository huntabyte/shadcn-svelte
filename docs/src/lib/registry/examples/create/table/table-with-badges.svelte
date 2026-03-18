<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Table from "$lib/registry/ui/table/index.js";
</script>

<Example title="With Badges">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Task</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head class="text-right">Priority</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell class="font-medium">Design homepage</Table.Cell>
				<Table.Cell>
					<span
						class="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400"
					>
						Completed
					</span>
				</Table.Cell>
				<Table.Cell class="text-right">
					<span
						class="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400"
					>
						High
					</span>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">Implement API</Table.Cell>
				<Table.Cell>
					<span
						class="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400"
					>
						In Progress
					</span>
				</Table.Cell>
				<Table.Cell class="text-right">
					<span
						class="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400"
					>
						Medium
					</span>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell class="font-medium">Write tests</Table.Cell>
				<Table.Cell>
					<span
						class="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400"
					>
						Pending
					</span>
				</Table.Cell>
				<Table.Cell class="text-right">
					<span
						class="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400"
					>
						Low
					</span>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</Example>
