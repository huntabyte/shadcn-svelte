<script lang="ts">
	import { ctx } from ".";
	const portal = ctx.getPortal();
	const open = ctx.getOpen();
</script>

<div use:portal {...$portal} {...$$restProps}>
	{#if $open}
		<div
			class="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
		>
			<slot />
		</div>
	{/if}
</div>
