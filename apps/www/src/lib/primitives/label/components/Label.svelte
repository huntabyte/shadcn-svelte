<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { Props } from "../types";

	type $$Props = Props;
	const label = ctx.getLabel();
</script>

<label use:melt={$label} {...$$restProps}>
	<slot />
</label>
