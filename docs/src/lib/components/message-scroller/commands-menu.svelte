<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { getMessageText } from "$lib/ai-sdk.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { useMessageScroller } from "$lib/registry/ui/message-scroller/index.js";
	import type { UIMessage } from "ai";

	let { userMessages }: { userMessages: UIMessage[] } = $props();

	const { scrollToMessage } = useMessageScroller();

	function getTrimmedMessageText(message: UIMessage) {
		const text = getMessageText(message);

		return text.length > 42 ? `${text.slice(0, 39)}...` : text;
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} type="button" variant="secondary">Jump to...</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" side="bottom" class="w-64">
		<DropdownMenu.Label>Conversations</DropdownMenu.Label>
		{#each userMessages as message (message.id)}
			<DropdownMenu.Item
				onSelect={() =>
					scrollToMessage(message.id, {
						align: "start",
						behavior: "smooth",
					})}
			>
				<span class="line-clamp-1 min-w-0">{getTrimmedMessageText(message)}</span>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
