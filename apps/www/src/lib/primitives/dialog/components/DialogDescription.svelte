<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { DescriptionProps } from "../types";

	type $$Props = DescriptionProps;
	const description = ctx.getDescription();
</script>

<div use:melt={$description} {...$$restProps}>
	<slot />
</div>
