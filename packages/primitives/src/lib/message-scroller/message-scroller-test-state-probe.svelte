<script lang="ts">
	import { useMessageScrollerScrollable } from "./index.js";
	import type { TestRef } from "./message-scroller-test-types.js";
	import type { MessageScrollerScrollable } from "./types.js";

	let {
		stateRef,
		stateRenderCountRef,
	}: {
		stateRef: TestRef<MessageScrollerScrollable>;
		stateRenderCountRef: TestRef<number>;
	} = $props();

	const state = useMessageScrollerScrollable();
	stateRef.current = state;

	$effect.pre(() => {
		void state.start;
		void state.end;
		stateRenderCountRef.current = (stateRenderCountRef.current ?? 0) + 1;
	});
</script>
