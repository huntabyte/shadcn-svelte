<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { AlertDialogDescriptionProps } from "../types";

	type $$Props = AlertDialogDescriptionProps;
	const description = ctx.getDescription();
</script>

<div use:melt={$description} {...$$restProps}>
	<slot />
</div>
