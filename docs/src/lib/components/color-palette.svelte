<script lang="ts">
	import type { ColorPalette } from "$lib/colors.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import ColorFormatSelector from "./color-format-selector.svelte";
	import Color from "./color.svelte";

	let { colorPalette, clipboard }: { colorPalette: ColorPalette; clipboard: UseClipboard } =
		$props();
</script>

<div id={colorPalette.name} class="scroll-mt-20 rounded-lg">
	<div class="flex items-center px-4">
		<div class="flex-1 ps-1 text-sm font-medium">
			<h2 class="capitalize">{colorPalette.name}</h2>
		</div>
		<ColorFormatSelector color={colorPalette.colors[0]} class="ms-auto" />
	</div>
	<div class="flex flex-col gap-4 py-4 sm:flex-row sm:gap-2">
		{#each colorPalette.colors as color (color.hex)}
			<Color {color} {clipboard} />
		{/each}
	</div>
</div>
