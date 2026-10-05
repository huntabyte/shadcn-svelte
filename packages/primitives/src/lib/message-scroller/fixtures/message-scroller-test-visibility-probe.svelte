<script lang="ts">
	import { useMessageScrollerVisibility } from "../index.js";
	import type { MessageScrollerVisibilityState } from "../types.js";
	import type { TestRef } from "./message-scroller-test-types.js";

	let { visibilityRef }: { visibilityRef: TestRef<MessageScrollerVisibilityState> } = $props();

	// The ref container is stable for the life of the test, so a one-time write is intended.
	// svelte-ignore state_referenced_locally
	visibilityRef.current = useMessageScrollerVisibility();
</script>
