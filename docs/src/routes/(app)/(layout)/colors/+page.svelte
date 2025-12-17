<script lang="ts">
	import { getColors } from "$lib/colors.js";
	import ColorPalette from "$lib/components/color-palette.svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";

	const colors = getColors();
	const clipboard = new UseClipboard({ delay: 0, reset: false });
</script>

<div class="grid gap-8 lg:gap-16 xl:gap-20">
	{#each colors as colorPalette (colorPalette.name)}
		<ColorPalette {colorPalette} {clipboard} />
	{/each}
</div>
