<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { TitleProps } from "../types";

	type $$Props = TitleProps;
	export let level: TitleProps["level"] = "h2";
	const title = ctx.getTitle();
</script>

<svelte:element this={level} use:melt={$title} {...$$restProps}>
	<slot />
</svelte:element>
