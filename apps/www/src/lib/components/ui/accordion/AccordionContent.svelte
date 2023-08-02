<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContent, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	const { content, isSelected, props } = getContent();
</script>

{#if $isSelected(props)}
	<div
		use:melt={$content(props)}
		class={cn("overflow-hidden text-sm", className)}
		{...$$restProps}
	>
		<div class="pb-4 pt-0">
			<slot />
		</div>
	</div>
{/if}
