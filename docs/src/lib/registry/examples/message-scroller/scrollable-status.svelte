<script lang="ts">
	import { useMessageScrollerScrollable } from "$lib/registry/ui/message-scroller/index.js";

	const scrollable = useMessageScrollerScrollable();
</script>

<div class="text-muted-foreground text-center text-sm" aria-live="polite">
	{#if scrollable.start && scrollable.end}
		More messages are available in both directions.
	{:else if scrollable.start}
		More messages are available above.
	{:else if scrollable.end}
		More messages are available below.
	{:else}
		You are viewing the full transcript.
	{/if}
</div>
