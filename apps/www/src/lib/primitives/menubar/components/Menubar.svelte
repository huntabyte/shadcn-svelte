<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	const menubar = ctx.set($$restProps);
</script>

<div use:melt={$menubar} {...$$restProps}>
	<slot />
</div>
