<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const { portal, open } = ctx.getPortal();
</script>

<div use:melt={$portal} class={cn(className)} {...$$restProps}>
	{#if $open}
		<div>
			<slot />
		</div>
	{/if}
</div>
