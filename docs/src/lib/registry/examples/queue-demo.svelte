<script lang="ts">
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import CircleDotIcon from "@lucide/svelte/icons/circle-dot";
	import ListChecksIcon from "@lucide/svelte/icons/list-checks";
	import ListTodoIcon from "@lucide/svelte/icons/list-todo";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIDataTypes, UIMessage } from "ai";

	type ChatMessage = UIMessage<
		unknown,
		UIDataTypes,
		{
			writeTodos: {
				input: {
					todos: {
						content: string;
						status: "pending" | "in_progress" | "completed";
					}[];
				};
				output: string;
			};
		}
	>;

	type Todo = Extract<
		ChatMessage["parts"][number],
		{ type: "tool-writeTodos"; state: "input-available" }
	>["input"]["todos"][number];

	const TODOS = [
		"Add a dark variant to the theme tokens",
		"Read the theme from a cookie",
		"Add a toggle to the settings page",
		"Check contrast on the charts",
	];

	function todosAt(current: number) {
		return TODOS.map(
			(content, index) =>
				({
					content,
					status: index < current ? "completed" : index === current ? "in_progress" : "pending",
				}) satisfies Todo
		);
	}

	const script = createChat<ChatMessage>()
		.user("Add dark mode to the settings page.")
		.assistant(({ writer }) => {
			TODOS.forEach((_, index) => {
				writer
					.tool("writeTodos", { input: { todos: todosAt(index) } })
					.output("Updated the todo list.");
				writer.sleep(1400);
			});
			writer
				.tool("writeTodos", { input: { todos: todosAt(TODOS.length) } })
				.output("Updated the todo list.");
			writer.text("Dark mode is in. The toggle is under Settings, Appearance.");
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

{#snippet todoLine(todo: Todo, streaming: boolean)}
	<Trace.Line status={streaming && todo.status === "in_progress" ? "running" : undefined}>
		<Trace.Icon>
			{#if todo.status === "completed"}
				<CircleCheckIcon />
			{:else if todo.status === "in_progress"}
				<CircleDotIcon />
			{:else}
				<CircleIcon />
			{/if}
		</Trace.Icon>
		<Trace.Title>{todo.content}</Trace.Title>
	</Trace.Line>
{/snippet}

{#snippet todoQueue(todos: Todo[], streaming: boolean)}
	{@const pending = todos.filter((todo) => todo.status !== "completed")}
	{@const completed = todos.filter((todo) => todo.status === "completed")}
	<Trace.Root>
		{#if pending.length > 0}
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
							{@render todoLine(todo, streaming)}
						{/each}
					</Trace.Root>
				</Trace.CollapsibleContent>
			</Trace.Collapsible>
		{/if}
		{#if completed.length > 0}
			<Trace.Collapsible open>
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
							{@render todoLine(todo, streaming)}
						{/each}
					</Trace.Root>
				</Trace.CollapsibleContent>
			</Trace.Collapsible>
		{/if}
	</Trace.Root>
{/snippet}

<div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
	{#each chat.messages as message (message.id)}
		{#if message.role === "user"}
			<Message.Root align="end">
				<Message.Content>
					<Bubble.Root align="end" variant="muted">
						<Bubble.Content>{getMessageText(message)}</Bubble.Content>
					</Bubble.Root>
				</Message.Content>
			</Message.Root>
		{:else}
			{@const streaming = busy && message === chat.messages.at(-1)}
			{@const todos = message.parts
				.filter((part) => part.type === "tool-writeTodos")
				.filter((part) => part.state !== "input-streaming")
				.at(-1)?.input?.todos}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if todos}
						{@render todoQueue(todos, streaming)}
					{/if}
					{#if text}
						<p>{text}</p>
					{/if}
				</Message.Content>
			</Message.Root>
		{/if}
	{/each}
	{#if !busy}
		<Button
			variant="outline"
			size="sm"
			class="mt-auto self-start"
			onclick={() => {
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
