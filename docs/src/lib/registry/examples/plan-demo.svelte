<script lang="ts">
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import CircleDotIcon from "@lucide/svelte/icons/circle-dot";
	import RouteIcon from "@lucide/svelte/icons/route";
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
			plan: {
				title: string;
				steps: { title: string; status: "done" | "running" | "pending" }[];
			};
		}
	>;

	type PlanPart = Extract<ChatMessage["parts"][number], { type: "data-plan" }>;

	const STEPS = [
		"Install @base-ui/react",
		"Replace the Radix imports",
		"Rename asChild to render",
		"Run the type checker",
	];

	function planAt(current: number) {
		return {
			title: "Plan: migrate to Base UI",
			steps: STEPS.map((title, index) => ({
				title,
				status: index < current ? "done" : index === current ? "running" : "pending",
			})),
		} satisfies PlanPart["data"];
	}

	const script = createChat<ChatMessage>()
		.user("Migrate the dialog components to Base UI.")
		.assistant(({ writer }) => {
			STEPS.forEach((_, index) => {
				writer.data({ type: "data-plan", id: "plan", data: planAt(index) }).sleep(1200);
			});
			writer.data({ type: "data-plan", id: "plan", data: planAt(STEPS.length) });
			writer.text("Migrated Dialog and AlertDialog. The type checker passes.");
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	const chat = new Chat<ChatMessage>({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

{#snippet planRow(plan: PlanPart["data"], streaming: boolean)}
	{@const done = plan.steps.filter((step) => step.status === "done").length}
	{@const running = streaming && done < plan.steps.length}
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status={running ? "running" : undefined}>
				<Trace.Icon>
					<RouteIcon />
				</Trace.Icon>
				<Trace.Title>{plan.title}</Trace.Title>
				<Trace.Description>
					{done} of {plan.steps.length} done
				</Trace.Description>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each plan.steps as step, index (index)}
					<Trace.Line
						status={step.status === "pending"
							? "pending"
							: streaming && step.status === "running"
								? "running"
								: undefined}
					>
						<Trace.Icon>
							{#if step.status === "done"}
								<CircleCheckIcon />
							{:else if step.status === "running"}
								<CircleDotIcon />
							{:else}
								<CircleIcon />
							{/if}
						</Trace.Icon>
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
			{@const plan = message.parts.find((part) => part.type === "data-plan")}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if plan}
						<Trace.Root>
							{@render planRow(plan.data, streaming)}
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
				chat.messages = [];
				void chat.sendMessage(question);
			}}
		>
			Replay
		</Button>
	{/if}
</div>
