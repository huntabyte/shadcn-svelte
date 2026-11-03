<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import { Chat } from "@ai-sdk/svelte";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { createChat, getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { UIMessage } from "ai";

	const script = createChat()
		.user("How do I start an Astro project with pnpm?")
		.assistant(({ writer }) => {
			writer.text(
				"Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies."
			);
			writer.sourceUrl({
				url: "https://docs.astro.build/en/install-and-setup/",
				title: "Install Astro | docs.astro.build",
			});
			writer.sourceUrl({
				url: "https://www.npmjs.com/package/create-astro",
				title: "create-astro | npmjs.com",
			});
			writer.sourceUrl({
				url: "https://docs.astro.build/en/install-and-setup/",
				title: "Install Astro | docs.astro.build",
			});
			writer.sourceUrl({
				url: "https://pnpm.io/cli/create",
				title: "pnpm create | pnpm.io",
			});
		});

	const transcript = script.get();
	const [question] = script.get(1);
	const transport = script.transport({ delayMs: 20 });

	type SourcePart = Extract<UIMessage["parts"][number], { type: "source-url" }>;

	const chat = new Chat({ messages: transcript, transport });
	const busy = $derived(chat.status === "submitted" || chat.status === "streaming");
</script>

{#snippet sourcesLine(sources: SourcePart[])}
	<Trace.Root>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>
						<GlobeIcon />
					</Trace.Icon>
					<Trace.Title>Used {sources.length} sources</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<Trace.Root>
					{#each sources as source (source.sourceId)}
						<a href={source.url} target="_blank" rel="noreferrer">
							<Trace.Line>
								<Trace.Title>
									{source.title ?? new URL(source.url).hostname}
									<span class="sr-only"> (opens in a new tab)</span>
								</Trace.Title>
								<Trace.Icon>
									<ArrowUpRightIcon />
								</Trace.Icon>
							</Trace.Line>
						</a>
					{/each}
				</Trace.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
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
			{@const sources = message.parts
				.filter((part) => part.type === "source-url")
				.filter((part, index, all) => all.findIndex((other) => other.url === part.url) === index)}
			{@const text = getMessageText(message)}
			<Message.Root>
				<Message.Content class="gap-4">
					{#if text}
						<p>{text}</p>
					{/if}
					{#if sources.length > 0}
						{@render sourcesLine(sources)}
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
