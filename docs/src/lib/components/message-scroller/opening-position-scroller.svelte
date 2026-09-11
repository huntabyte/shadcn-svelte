<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";
	import { useMessageScroller } from "$lib/registry/ui/message-scroller/index.js";

	let {
		position,
		positionKey,
	}: {
		position: "start" | "end" | "last-anchor";
		positionKey: number;
	} = $props();

	const messages = [
		{
			id: "open-1",
			role: "user",
			text: "This is the first message the user sent in the conversation.",
		},
		{
			id: "open-2",
			role: "assistant",
			text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
		},
		{
			id: "open-3",
			role: "user",
			text: "This is the last message the user sent in the conversation.",
		},
		{
			id: "open-4",
			role: "assistant",
			text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.",
		},
	] satisfies Array<{
		id: string;
		role: "user" | "assistant";
		text: string;
	}>;

	const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller();

	$effect(() => {
		position;
		positionKey;
		const frame = requestAnimationFrame(() => {
			if (position === "start") {
				scrollToStart({ behavior: "auto" });
				return;
			}

			if (position === "end") {
				scrollToEnd({ behavior: "auto" });
				return;
			}

			scrollToMessage("open-3", {
				align: "start",
				behavior: "auto",
				scrollMargin: 64,
			});
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<MessageScroller.Root>
	<MessageScroller.Viewport>
		<MessageScroller.Content class="p-(--card-spacing)">
			{#each messages as message (message.id)}
				{@const isUserMessage = message.role === "user"}
				{@const paragraphs = message.text
					.split(/\n\s*\n/)
					.map((paragraph: string) => paragraph.trim())
					.filter(Boolean)}
				<MessageScroller.Item messageId={message.id} scrollAnchor={isUserMessage}>
					<Message.Root align={isUserMessage ? "end" : "start"}>
						<Message.Content>
							<Bubble.Root variant={isUserMessage ? "muted" : "ghost"}>
								<Bubble.Content class="space-y-2">
									{#each paragraphs as paragraph, index (`${message.id}-${index}`)}
										<p class="whitespace-pre-wrap">{paragraph}</p>
									{/each}
								</Bubble.Content>
							</Bubble.Root>
						</Message.Content>
					</Message.Root>
				</MessageScroller.Item>
			{/each}
		</MessageScroller.Content>
	</MessageScroller.Viewport>
	<MessageScroller.Button />
</MessageScroller.Root>
