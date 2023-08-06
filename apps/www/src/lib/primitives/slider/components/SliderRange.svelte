<script lang="ts">
	import { ctx } from "../ctx";
	import type { RangeProps } from "../types";
	import { melt } from "@melt-ui/svelte";

	type $$Props = RangeProps;
	const {
		elements: { range }
	} = ctx.get();
</script>

<span use:melt={$range} {...$$restProps} />
