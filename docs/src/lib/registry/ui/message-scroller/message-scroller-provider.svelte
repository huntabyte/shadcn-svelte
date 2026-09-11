<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn/svelte/message-scroller";

	let { ...restProps }: MessageScrollerPrimitive.ProviderProps = $props();
</script>

<MessageScrollerPrimitive.Provider {...restProps} />
