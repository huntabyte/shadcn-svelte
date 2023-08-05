<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ItemProps } from "../types";

	type $$Props = ItemProps;
	const {
		elements: { item }
	} = ctx.get();
</script>

<div use:melt={$item} {...$$restProps}>
	<slot />
</div>
