<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { AlertDialogTitleProps } from "./types";

	type $$Props = AlertDialogTitleProps;
	export let level: AlertDialogTitleProps["level"] = "h2";
	const title = ctx.getTitle();
</script>

<svelte:element this={level} use:melt={$title} {...$$restProps}>
	<slot />
</svelte:element>
