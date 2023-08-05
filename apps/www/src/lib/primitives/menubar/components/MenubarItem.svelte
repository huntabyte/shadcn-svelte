<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ItemProps } from "../types";

	type $$Props = ItemProps;
	const { item } = ctx.getItem();
</script>

<div use:melt={$item} {...$$restProps}>
	<slot />
</div>
