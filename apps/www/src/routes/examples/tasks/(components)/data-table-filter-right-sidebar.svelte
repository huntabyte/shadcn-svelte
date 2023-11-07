<script lang="ts">
	import * as Card from "@/registry/default/ui/card";
	import { Label } from "@/registry/default/ui/label";
	import * as Select from "@/registry/default/ui/select";
	import { Textarea } from "@/registry/default/ui/textarea";
	import Button from "@/registry/new-york/ui/button/button.svelte";
	import Input from "@/registry/new-york/ui/input/input.svelte";
	import type { TableViewModel } from "svelte-headless-table/lib/createViewModel";
	import type { AnyPlugins } from "svelte-headless-table/lib/types/TablePlugin";
	import { priorities, statuses } from "../(data)/data";
	import type { Task } from "../(data)/schemas";

	export let tableModel: TableViewModel<Task, AnyPlugins>;

	const { pluginStates } = tableModel;

	const {
		custom: { taskOnEdition, taskIdOnEdition }
	} = pluginStates;

	$: task = $taskOnEdition || {};
	$: selectedStatus = statuses.find(({ value }) => task.status === value);
	$: selectedPriority = priorities.find(
		({ value }) => task.priority === value
	);
</script>

<aside class="relative col-span-3 border-l border-b p-2">
	<div class="sticky top-12 flex flex-col h-full">
		<Card.Header>
			<Card.Title># {task.id}</Card.Title>
			<Card.Description>
				Here you can edit your task information
			</Card.Description>
		</Card.Header>
		<Card.Content class="grow grid gap-2">
			<div class="grid gap-2">
				<Label for="title">Title</Label>
				<Input
					id="title"
					placeholder="Task title ..."
					bind:value={task.title}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="status">Status</Label>
				<Select.Root bind:selected={selectedStatus}>
					<Select.Trigger id="status">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content>
						{#each statuses as status}
							<Select.Item
								value={status.value}
								label={status.label}
							>
								{status.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="priority">Priority</Label>
				<Select.Root bind:selected={selectedPriority}>
					<Select.Trigger id="priority">
						<Select.Value placeholder="Select" />
					</Select.Trigger>
					<Select.Content>
						{#each priorities as priority}
							<Select.Item
								value={priority.value}
								label={priority.label}
							>
								{priority.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					placeholder="Please include all information relevant to your issue."
					bind:value={task.description}
				/>
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-1  items-end justify-end space-x-2">
			<Button
				on:click={() => taskIdOnEdition.set(null)}
				variant="secondary"
			>
				Cancel
			</Button>
			<Button on:click={() => taskIdOnEdition.set(null)}>Submit</Button>
		</Card.Footer>
	</div>
</aside>
