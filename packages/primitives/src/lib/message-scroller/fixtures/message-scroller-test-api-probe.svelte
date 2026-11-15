<script lang="ts">
	import { useMessageScroller } from "../index.js";
	import type { TestRef, TestScrollerApi } from "./message-scroller-test-types.js";

	let { apiRef }: { apiRef: TestRef<TestScrollerApi> } = $props();

	// The ref container is stable for the life of the test, so a one-time write is intended.
	// svelte-ignore state_referenced_locally
	apiRef.current = useMessageScroller();
</script>
