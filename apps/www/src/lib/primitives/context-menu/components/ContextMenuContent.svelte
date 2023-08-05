<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "../ctx";
	import type { ContentProps } from "../types";

	type $$Props = ContentProps;
	const {
		elements: { menu: content },
		states: { open }
	} = ctx.get();
</script>

{#if $open}
	<div use:melt={$content} {...$$restProps}>
		<slot />
	</div>
{/if}
