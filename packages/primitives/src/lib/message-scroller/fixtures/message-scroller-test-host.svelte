<script lang="ts">
	import TestScroller from "./message-scroller-test-scroller.svelte";
	import type { TestScrollerOptions, TestScrollerRefs } from "./message-scroller-test-types.js";

	let { initial, ...refs }: { initial: TestScrollerOptions } & TestScrollerRefs = $props();

	// `initial` is intentionally only read once; tests drive updates via `apply`.
	// svelte-ignore state_referenced_locally
	let options = $state(initial);
	let parentTick = $state(0);

	export function apply(next: TestScrollerOptions) {
		options = next;
	}

	export function bumpParent() {
		parentTick += 1;
	}
</script>

<div data-parent-tick={parentTick}>
	<TestScroller {...options} {...refs} />
</div>
