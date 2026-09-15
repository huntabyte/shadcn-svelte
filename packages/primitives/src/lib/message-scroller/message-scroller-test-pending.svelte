<script lang="ts">
	import { MessageScroller } from "./index.js";
	import type { PendingScrollTreeProps } from "./message-scroller-test-types.js";

	let {
		defaultScrollPosition,
		items = ["One"],
		scrollAnchor = false,
		testIds = false,
	}: PendingScrollTreeProps = $props();
</script>

<MessageScroller.Provider {defaultScrollPosition}>
	<MessageScroller.Root data-testid={testIds ? "scroller" : undefined}>
		<MessageScroller.Viewport data-testid={testIds ? "viewport" : undefined}>
			<MessageScroller.Content>
				{#each items as label, index (label)}
					<MessageScroller.Item messageId={`message-${index + 1}`} {scrollAnchor}>
						{label}
					</MessageScroller.Item>
				{/each}
			</MessageScroller.Content>
		</MessageScroller.Viewport>
	</MessageScroller.Root>
</MessageScroller.Provider>
