<script lang="ts">
	import MemoMessageItem from "./message-scroller-browser-memo-item.svelte";
	import VisibilityProbe from "./message-scroller-browser-visibility.svelte";
	import { MessageScroller } from "../index.js";

	let { ids }: { ids: string[] } = $props();
</script>

<MessageScroller.Provider defaultScrollPosition="start">
	<MessageScroller.Root>
		<MessageScroller.Viewport aria-label="viewport" style="height: 200px; overflow-y: auto;">
			<MessageScroller.Content style="display: flex; flex-direction: column;">
				{#each ids as id, index (id)}
					<MemoMessageItem {id} anchor={index % 2 === 0} />
				{/each}
			</MessageScroller.Content>
		</MessageScroller.Viewport>
		<VisibilityProbe />
	</MessageScroller.Root>
</MessageScroller.Provider>
