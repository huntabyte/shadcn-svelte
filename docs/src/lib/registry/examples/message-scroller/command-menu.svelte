<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { useMessageScroller } from "$lib/registry/ui/message-scroller/index.js";

	let { messageIds }: { messageIds: string[] } = $props();
	const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller();
</script>

<div class="flex flex-wrap justify-center gap-2">
	<Button variant="secondary" size="sm" onclick={() => scrollToStart({ behavior: "smooth" })}>
		Start
	</Button>
	{#each messageIds as messageId, index (messageId)}
		<Button
			variant="secondary"
			size="sm"
			onclick={() => scrollToMessage(messageId, { behavior: "smooth", align: "center" })}
		>
			Turn {index + 1}
		</Button>
	{/each}
	<Button variant="secondary" size="sm" onclick={() => scrollToEnd({ behavior: "smooth" })}>
		End
	</Button>
</div>
