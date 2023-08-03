<script lang="ts">
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let asChild: boolean = false;
	const trigger = ctx.getTrigger();
</script>

{#if !asChild}
	<button use:melt={$trigger} class={className} {...$$restProps}>
		<slot />
	</button>
{:else}
	<slot trigger={$trigger} />
{/if}
