<script lang="ts">
	import { ctx, melt } from ".";
	const { portal, open } = ctx.getPortal();
</script>

<div use:melt={$portal} {...$$restProps}>
	{#if $open}
		<div
			class="fixed inset-0 z-50 flex items-start justify-center sm:items-center"
		>
			<slot />
		</div>
	{/if}
</div>
