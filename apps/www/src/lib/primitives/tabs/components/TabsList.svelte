<script lang="ts">
	import { ctx } from "../ctx";
	import type { ListProps } from "../types";
	import { melt } from "@melt-ui/svelte";
	type $$Props = ListProps;

	const {
		elements: { list }
	} = ctx.get();
</script>

<div use:melt={$list} {...$$restProps}>
	<slot />
</div>
