<script lang="ts">
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import * as Message from "$lib/registry/ui/message/index.js";
	import * as MessageScroller from "$lib/registry/ui/message-scroller/index.js";

	let {
		item,
		currentUser,
	}: {
		item: {
			id: string;
			type: "message";
			sender: string;
			role: "assistant" | "participant";
			text: string;
			scrollAnchor?: boolean;
		};
		currentUser: string;
	} = $props();

	const isCurrentUser = $derived(item.sender === currentUser);
	const variant = $derived(
		isCurrentUser ? "muted" : item.role === "assistant" ? "ghost" : "tinted"
	);
</script>

<MessageScroller.Item messageId={item.id} scrollAnchor={item.scrollAnchor}>
	<Message.Root align={isCurrentUser ? "end" : "start"}>
		<Message.Content>
			{#if !isCurrentUser}
				<Message.Header>{item.sender}</Message.Header>
			{/if}
			<Bubble.Root {variant}>
				<Bubble.Content>{item.text}</Bubble.Content>
			</Bubble.Root>
		</Message.Content>
	</Message.Root>
</MessageScroller.Item>
