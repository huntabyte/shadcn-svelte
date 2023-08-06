<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;

	export const loop: $$Props["loop"] = true;
	export const closeOnEscape: $$Props["closeOnEscape"] = true;

	const {
		elements: { menubar },
		updateOption
	} = ctx.set($$restProps);

	$: updateOption("loop", loop);
	$: updateOption("closeOnEscape", closeOnEscape);
</script>

<div use:melt={$menubar} {...$$restProps}>
	<slot />
</div>
