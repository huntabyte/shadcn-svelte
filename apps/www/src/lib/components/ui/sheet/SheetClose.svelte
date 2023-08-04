<script lang="ts">
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let asChild = false;
	const close = ctx.getClose();
</script>

{#if asChild}
	<slot close={$close} />
{:else}
	<button
		use:melt={$close}
		on:m-click
		on:m-keydown
		class={className}
		{...$$restProps}
	>
		<slot close={$close} />
	</button>
{/if}
