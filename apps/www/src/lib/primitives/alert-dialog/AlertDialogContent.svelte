<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { AlertDialogContentProps } from "./types";

	type $$Props = AlertDialogContentProps;

	const content = ctx.getContent();
</script>

<div use:melt={$content} {...$$restProps}>
	<slot />
</div>
