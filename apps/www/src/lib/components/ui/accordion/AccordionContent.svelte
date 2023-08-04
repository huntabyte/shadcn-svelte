<script lang="ts">
	import { cn } from "$lib/utils";
	import { slide } from "svelte/transition";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const { content, isSelected, props } = ctx.getContent();
</script>

{#if $isSelected(props)}
	<div
		use:melt={$content(props)}
		class={cn("overflow-hidden text-sm", className)}
		transition:slide={{ duration: 200 }}
		{...$$restProps}
	>
		<div class="pb-4 pt-0">
			<slot />
		</div>
	</div>
{/if}
