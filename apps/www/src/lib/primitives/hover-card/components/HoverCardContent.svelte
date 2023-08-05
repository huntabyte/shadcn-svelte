<script lang="ts">
	import { ctx, melt } from "../ctx";
	import type { ContentProps } from "../types";

	type $$Props = ContentProps;
	const { content, open } = ctx.getContent();
</script>

{#if $open}
	<div use:melt={$content} {...$$restProps}>
		<slot />
	</div>
{/if}
