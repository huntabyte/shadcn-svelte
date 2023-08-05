<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import { ctx } from "./ctx";
	import type { SubContentProps } from "./types";

	type $$Props = SubContentProps;
	const { subContent, subOpen } = ctx.getSubContent();
</script>

{#if $subOpen}
	<div use:melt={$subContent} {...$$restProps}>
		<slot />
	</div>
{/if}
