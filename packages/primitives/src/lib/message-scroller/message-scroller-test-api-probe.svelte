<script lang="ts">
	import { useMessageScroller } from "./index.js";
	import type { TestRef, TestScrollerApi } from "./message-scroller-test-types.js";

	let { apiRef }: { apiRef: TestRef<TestScrollerApi> } = $props();

	apiRef.current = useMessageScroller();
</script>
