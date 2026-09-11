<script lang="ts">
	import { MessageScroller as MessageScrollerPrimitive } from "@shadcn-svelte/primitives/message-scroller";

	let { ...restProps }: MessageScrollerPrimitive.ProviderProps = $props();
</script>

<MessageScrollerPrimitive.Provider {...restProps} />
