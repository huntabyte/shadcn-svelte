<script lang="ts" module>
	export type TranscriptMessage = {
		id: string;
		role: "assistant" | "marker" | "user";
		text: string;
		author?: string;
		anchor?: boolean;
	};
</script>

<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	let {
		messages,
		contentClass = "gap-6 p-(--card-spacing)",
		itemClass,
	}: {
		messages: TranscriptMessage[];
		contentClass?: string;
		itemClass?: string;
	} = $props();
</script>

<MessageScroller.Root>
	<MessageScroller.Viewport>
		<MessageScroller.Content class={contentClass}>
			{#each messages as message (message.id)}
				<MessageScroller.Item
					messageId={message.id}
					scrollAnchor={message.anchor ?? message.role === "user"}
					class={itemClass}
				>
					{#if message.role === "marker"}
						<Marker.Root variant="separator">
							<Marker.Content>{message.text}</Marker.Content>
						</Marker.Root>
					{:else}
						<Message.Root align={message.role === "user" ? "end" : "start"}>
							<Message.Content>
								{#if message.author}<Message.Header>{message.author}</Message.Header
									>{/if}
								<Bubble.Root
									variant={message.role === "user" ? "default" : "muted"}
								>
									<Bubble.Content class="whitespace-pre-line"
										>{message.text}</Bubble.Content
									>
								</Bubble.Root>
							</Message.Content>
						</Message.Root>
					{/if}
				</MessageScroller.Item>
			{/each}
		</MessageScroller.Content>
	</MessageScroller.Viewport>
	<MessageScroller.Button />
</MessageScroller.Root>
