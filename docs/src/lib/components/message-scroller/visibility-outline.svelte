<script lang="ts">
	import type { DemoMessage } from "$lib/ai.js";
	import { getMessageText } from "$lib/ai.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { useMessageScroller, useMessageScrollerVisibility } from "$lib/registry/ui/message-scroller/index.js";

	let { userMessages }: { userMessages: DemoMessage[] } = $props();

	const { scrollToMessage } = useMessageScroller();
	const { currentAnchorId } = useMessageScrollerVisibility();

	function getTrimmedMessageText(message: DemoMessage) {
		const text = getMessageText(message);

		return text.length > 42 ? `${text.slice(0, 39)}...` : text;
	}
</script>

<HoverCard.Root openDelay={0} closeDelay={0}>
	<HoverCard.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				aria-label="Open transcript outline"
				class="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				{#each userMessages as message (message.id)}
					<span
						data-current={message.id === currentAnchorId}
						class="h-0.5 w-4 rounded-full bg-muted-foreground/40 data-[current=true]:bg-foreground"
					></span>
				{/each}
			</button>
		{/snippet}
	</HoverCard.Trigger>
	<HoverCard.Content
		align="center"
		side="left"
		sideOffset={-28}
		class="flex w-64 flex-col gap-1 rounded-2xl p-1"
	>
		{#each userMessages as message (message.id)}
			<button
				type="button"
				aria-current={currentAnchorId === message.id ? "location" : undefined}
				class="flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground"
				onclick={() =>
					scrollToMessage(message.id, {
						align: "start",
						behavior: "smooth",
					})}
			>
				<span class="line-clamp-1 min-w-0">{getTrimmedMessageText(message)}</span>
			</button>
		{/each}
	</HoverCard.Content>
</HoverCard.Root>
