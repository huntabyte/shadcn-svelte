<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ContentProps } from "../types";

	type $$Props = ContentProps;
	export let value: $$Props["value"];

	const {
		elements: { content }
	} = ctx.get();
</script>

<div use:melt={$content(value)} {...$$restProps}>
	<slot />
</div>
