<script lang="ts">
	import { watch } from "runed";
	import { useMessageScrollerScrollable } from "../index.js";
	import type { MessageScrollerScrollable } from "../types.js";
	import type { TestRef } from "./message-scroller-test-types.js";

	let {
		stateRef,
		stateRenderCountRef,
	}: {
		stateRef: TestRef<MessageScrollerScrollable>;
		stateRenderCountRef: TestRef<number>;
	} = $props();

	const state = useMessageScrollerScrollable();
	// The ref container is stable for the life of the test, so a one-time write is intended.
	// svelte-ignore state_referenced_locally
	stateRef.current = state;

	watch.pre([() => state.start, () => state.end], () => {
		stateRenderCountRef.current = (stateRenderCountRef.current ?? 0) + 1;
	});
</script>
