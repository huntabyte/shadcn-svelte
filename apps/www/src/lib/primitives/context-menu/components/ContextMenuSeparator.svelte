<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { SeparatorProps } from "../types";

	type $$Props = SeparatorProps;
	const separator = ctx.getSeparator();
</script>

<div use:melt={$separator} {...$$restProps} />
