<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ContentProps } from "../types";

	type $$Props = ContentProps;
	export let sideOffset = 4;
	const { content, open } = ctx.getContent(sideOffset);
</script>

{#if $open}
	<div use:melt={$content} {...$$restProps}>
		<slot />
	</div>
{/if}
