<script lang="ts">
	import { setContext } from "svelte";
	import { DIRECTION_CONTEXT, type Direction, type DirectionContext } from "./direction.svelte.js";
	import type { Snippet } from "svelte";

	let { direction = "ltr", children }: { direction?: Direction; children?: Snippet } = $props();

	const context: DirectionContext = {
		direction: () => direction,
	};

	setContext(DIRECTION_CONTEXT, context);
</script>

{@render children?.()}
