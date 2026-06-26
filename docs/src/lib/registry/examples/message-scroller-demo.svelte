<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	const messages = [
		{ id: "m1", role: "assistant", content: "I found the failing preview import." },
		{ id: "m2", role: "user", content: "Can you make the examples compile?" },
		{
			id: "m3",
			role: "assistant",
			content: "Yes. The docs now use local Svelte registry components.",
		},
	] as const;
</script>

<div class="h-[360px] w-full max-w-sm rounded-xl border">
	<MessageScroller.Provider>
		<MessageScroller.Root>
			<MessageScroller.Viewport>
				<MessageScroller.Content class="gap-4 p-4">
					{#each messages as message (message.id)}
						<MessageScroller.Item scrollAnchor={message.role === "user"}>
							<Message.Root align={message.role === "user" ? "end" : "start"}>
								<Message.Content>
									<Bubble.Root
										variant={message.role === "user" ? "default" : "muted"}
									>
										<Bubble.Content>{message.content}</Bubble.Content>
									</Bubble.Root>
								</Message.Content>
							</Message.Root>
						</MessageScroller.Item>
					{/each}
				</MessageScroller.Content>
			</MessageScroller.Viewport>
			<MessageScroller.Button />
		</MessageScroller.Root>
	</MessageScroller.Provider>
</div>
