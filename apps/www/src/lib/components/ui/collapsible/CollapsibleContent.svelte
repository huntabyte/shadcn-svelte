<script lang="ts">
	import { slide } from "svelte/transition";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	const { content, open } = ctx.getContent();
</script>

{#if $open}
	<div
		use:melt={$content}
		class={className}
		{...$$restProps}
		transition:slide
	>
		<slot />
	</div>
{/if}
