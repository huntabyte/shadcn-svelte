<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { FallbackProps } from "../types";

	type $$Props = FallbackProps;

	const {
		elements: { fallback }
	} = ctx.getFallback();
</script>

<span use:melt={$fallback} {...$$restProps}>
	<slot />
</span>
