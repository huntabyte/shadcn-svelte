<script lang="ts">
	import { MessageScroller } from "./index.js";
	import type { MessageScrollerDefaultScrollPosition } from "./types.js";
	import JumpButton from "./message-scroller-browser-jump.svelte";
	import VisibilityProbe from "./message-scroller-browser-visibility.svelte";

	export type BrowserTestItem = {
		height?: number;
		id: string;
		scrollAnchor?: boolean;
	};

	let {
		autoScroll,
		defaultScrollPosition,
		items,
		itemHeight = 80,
		itemClass,
		scrollPreviousItemPeek,
		showButton = false,
		showJumpButton = false,
		showVisibility = false,
	}: {
		autoScroll?: boolean;
		defaultScrollPosition?: MessageScrollerDefaultScrollPosition;
		items: BrowserTestItem[];
		itemHeight?: number;
		itemClass?: string;
		scrollPreviousItemPeek?: number;
		showButton?: boolean;
		showJumpButton?: boolean;
		showVisibility?: boolean;
	} = $props();
</script>

<MessageScroller.Provider {autoScroll} {defaultScrollPosition} {scrollPreviousItemPeek}>
	<MessageScroller.Root>
		<MessageScroller.Viewport aria-label="viewport" style="height: 200px; overflow-y: auto;">
			<MessageScroller.Content style="display: flex; flex-direction: column;">
				{#each items as item (item.id)}
					<MessageScroller.Item
						messageId={item.id}
						scrollAnchor={item.scrollAnchor}
						style="height: {item.height ?? itemHeight}px; flex: none;"
						class={itemClass}
					>
						{item.id}
					</MessageScroller.Item>
				{/each}
			</MessageScroller.Content>
		</MessageScroller.Viewport>
		{#if showButton}
			<MessageScroller.Button behavior="auto">Scroll to end</MessageScroller.Button>
		{/if}
		{#if showJumpButton}
			<JumpButton messageId="m5" />
		{/if}
		{#if showVisibility}
			<VisibilityProbe />
		{/if}
	</MessageScroller.Root>
</MessageScroller.Provider>
