<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ContentProps } from "../types";

	type $$Props = ContentProps;
	const { open, content } = ctx.getContent();
</script>

{#if $open}
	<div use:melt={$content} {...$$restProps}>
		<slot />
	</div>
{/if}
