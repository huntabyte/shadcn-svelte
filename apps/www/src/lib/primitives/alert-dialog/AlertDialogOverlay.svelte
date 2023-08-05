<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { AlertDialogOverlayProps } from "./types";

	type $$Props = AlertDialogOverlayProps;
	const overlay = ctx.getOverlay();
</script>

<div use:melt={$overlay} {...$$restProps} />
