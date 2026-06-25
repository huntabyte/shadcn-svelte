<script lang="ts">
	import type { Snippet } from "svelte";
	import { setDirectionContext, type Direction } from "./direction.svelte.js";

	let {
		dir = "ltr",
		direction,
		children,
	}: {
		dir?: Direction;
		direction?: Direction;
		children?: Snippet;
	} = $props();

	const current = $derived(direction ?? dir);

	setDirectionContext(() => current);
</script>

<div dir={current} data-slot="direction-provider">
	{@render children?.()}
</div>
