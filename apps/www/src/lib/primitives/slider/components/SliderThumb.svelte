<script lang="ts">
	import { ctx } from "../ctx";
	import type { ThumbProps } from "../types";
	import { melt } from "@melt-ui/svelte";

	type $$Props = ThumbProps;
	const {
		elements: { thumb }
	} = ctx.get();
</script>

<span use:melt={$thumb()} {...$$restProps} />
