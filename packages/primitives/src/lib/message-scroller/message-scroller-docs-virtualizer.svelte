<script lang="ts">
	import { useVirtualizer } from "../svelte-virtual/index.js";
	import { MessageScroller } from "./index.js";

	let {
		messages,
	}: {
		messages: Array<{ id: string; text: string }>;
	} = $props();

	let viewport = $state<HTMLDivElement | null>(null);

	const virtualizer = useVirtualizer({
		get count() {
			return messages.length;
		},
		getScrollElement: () => viewport,
		estimateSize: () => 86,
		getItemKey: (index) => messages[index]?.id ?? index,
		overscan: 8,
	});
</script>

<MessageScroller.Provider>
	<MessageScroller.Root>
		<MessageScroller.Viewport
			bind:ref={viewport}
			aria-label="viewport"
			style="height: 320px; overflow-y: auto;"
		>
			<MessageScroller.Content class="block min-h-full">
				<div class="relative w-full" style="height: {virtualizer.getTotalSize()}px">
					{#each virtualizer.getVirtualItems() as virtualItem (virtualItem.key)}
						{@const message = messages[virtualItem.index]}
						{#if message}
							<div
								data-index={virtualItem.index}
								data-message-id={message.id}
								class="absolute start-0 top-0 w-full"
								style="transform: translateY({virtualItem.start}px); height: 86px;"
								{@attach (node) => virtualizer.measureElement(node)}
							>
								{message.text}
							</div>
						{/if}
					{/each}
				</div>
			</MessageScroller.Content>
		</MessageScroller.Viewport>
		<MessageScroller.Button />
	</MessageScroller.Root>
</MessageScroller.Provider>
