<script lang="ts">
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIMessage } from "ai";

	type ChatMessage = UIMessage<
		unknown,
		{
			task: {
				title: string;
				steps: { title: string; status: "done" | "running" | "error" }[];
			};
		}
	>;

	type TaskPart = Extract<ChatMessage["parts"][number], { type: "data-task" }>;

	type Status = "running" | "error" | undefined;

	const TASKS = [
		{
			id: "find",
			title: ["Finding the project files", "Found the project files"],
			steps: [
				["Searching for generateMetadata", "Searched for generateMetadata"],
				["Reading app/layout.tsx", "Read app/layout.tsx"],
				["Reading app/page.tsx", "Read app/page.tsx"],
			],
		},
		{
			id: "update",
			title: ["Updating the page metadata", "Updated the page metadata"],
			steps: [
				["Editing app/layout.tsx", "Edited app/layout.tsx"],
				["Editing app/page.tsx", "Edited app/page.tsx"],
			],
		},
	];

	function taskAt(task: (typeof TASKS)[number], done: number) {
		return {
			title: task.title[done < task.steps.length ? 0 : 1],
			steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
				title: index < done ? finished : running,
				status: index < done ? "done" : "running",
			})),
		} satisfies TaskPart["data"];
	}

	const script = createChat<ChatMessage>()
		.user("Add Open Graph metadata to the home page.")
		.assistant(({ writer }) => {
			TASKS.forEach((task) => {
				for (let done = 0; done <= task.steps.length; done++) {
					writer.data({ type: "data-task", id: task.id, data: taskAt(task, done) }).sleep(900);
				}
			});
			writer.text(
				"Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx."
			);
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");

	// The reader's choice for each task. Until they click, it follows the task's status.
	let taskOpen = $state<Record<string, boolean>>({});

	function getStepStatus(
		status: TaskPart["data"]["steps"][number]["status"],
		streaming: boolean
	): Status {
		if (status === "done") {
			return undefined;
		}

		return status === "running" && streaming ? "running" : "error";
	}
</script>

{#snippet statusIcon(status: Status)}
	{#if status === "running"}
		<LoaderCircleIcon class="animate-spin" />
	{:else if status === "error"}
		<CircleAlertIcon />
	{:else}
		<CircleCheckIcon />
	{/if}
{/snippet}

{#snippet taskRow(id: string, task: TaskPart["data"], streaming: boolean)}
	{@const steps = task.steps.map((step) => ({
		title: step.title,
		status: getStepStatus(step.status, streaming),
	}))}
	{@const status = steps.some((step) => step.status === "error")
		? "error"
		: steps.some((step) => step.status === "running")
			? "running"
			: undefined}
	<Trace.Collapsible
		open={taskOpen[id] ?? status === "running"}
		onOpenChange={(open) => (taskOpen[id] = open)}
	>
		<Trace.CollapsibleTrigger>
			<Trace.Line {status}>
				<Trace.Icon>
					{@render statusIcon(status)}
				</Trace.Icon>
				<Trace.Title>{task.title}</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each steps as step, index (index)}
					<Trace.Line status={step.status}>
						<Trace.Title>{step.title}</Trace.Title>
					</Trace.Line>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
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
			{@const tasks = message.parts.filter((part) => part.type === "data-task")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if tasks.length > 0}
						<Trace.Root>
							{#each tasks as part (part.id)}
								{@render taskRow(`${message.id}-${part.id}`, part.data, streaming)}
							{/each}
						</Trace.Root>
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
				taskOpen = {};
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
