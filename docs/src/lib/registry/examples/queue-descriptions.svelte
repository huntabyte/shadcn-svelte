<script lang="ts">
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import ListChecksIcon from "@lucide/svelte/icons/list-checks";
	import ListTodoIcon from "@lucide/svelte/icons/list-todo";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	type Todo = { title: string; description?: string; done: boolean };

	const todos: Todo[] = [
		{
			title: "Write the migration guide",
			description: "Cover the renamed props and the new data attributes.",
			done: true,
		},
		{ title: "Add a changeset", done: true },
		{
			title: "Fix the focus ring on the select trigger",
			description: "It is clipped by overflow-hidden on the field.",
			done: false,
		},
		{ title: "Update the registry snapshots", done: false },
		{
			title: "Add tests for the combobox",
			description: "Typing, clearing and keyboard selection.",
			done: false,
		},
	];

	const pending = todos.filter((todo) => !todo.done);
	const completed = todos.filter((todo) => todo.done);
</script>

{#snippet todoRow(todo: Todo)}
	{#snippet line()}
		<Trace.Line>
			<Trace.Icon>
				{#if todo.done}
					<CircleCheckIcon />
				{:else}
					<CircleIcon />
				{/if}
			</Trace.Icon>
			<Trace.Title>{todo.title}</Trace.Title>
		</Trace.Line>
	{/snippet}
	{#if !todo.description}
		{@render line()}
	{:else}
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>{@render line()}</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>{todo.description}</Trace.CollapsibleContent>
		</Trace.Collapsible>
	{/if}
{/snippet}

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<ListTodoIcon />
				</Trace.Icon>
				<Trace.Title>{pending.length} to do</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each pending as todo, index (index)}
					{@render todoRow(todo)}
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
	<Trace.Collapsible>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<ListChecksIcon />
				</Trace.Icon>
				<Trace.Title>{completed.length} completed</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each completed as todo, index (index)}
					{@render todoRow(todo)}
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
