<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { GroupProps } from "../types";

	type $$Props = GroupProps;
	const { group, id } = ctx.setGroup();
</script>

<div use:melt={$group(id)} {...$$restProps}>
	<slot />
</div>
