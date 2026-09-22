<script lang="ts">
	import { useMessageScrollerVisibility } from "../index.js";
	import type { MessageScrollerVisibilityState } from "../types.js";
	import type { TestRef } from "./message-scroller-test-types.js";

	let { visibilityRef }: { visibilityRef: TestRef<MessageScrollerVisibilityState> } = $props();

	visibilityRef.current = useMessageScrollerVisibility();
</script>
