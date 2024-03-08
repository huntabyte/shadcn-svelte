<script lang="ts">
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { hexToHsl, hexToRgb } from "$lib/utils.js";
	import { CopyButton } from "./index.js";

	let hex = "#030711";
	let hsl: [number, number, number] = [0, 0, 0];
	let rgb: [number, number, number] = [0, 0, 0];
	$: if (hex && ((hex.length === 6 && hex[0] !== "#") || (hex.length === 7 && hex[0] === "#"))) {
		hsl = hexToHsl(hex);
		rgb = hexToRgb(hex);
	}

	$: hslString = `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;
	$: rgbString = `${rgb[0]} ${rgb[1]} ${rgb[2]}`;
</script>

<div
	class="mt-2 flex h-[300px] items-center justify-center rounded-md border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
	<div class="mx-auto w-full max-w-sm space-y-6 py-4">
		<div class="grid gap-2">
			<Label for="hex">HEX</Label>
			<Input name="hex" bind:value={hex} maxlength={7} />
		</div>
		<div class="relative grid gap-2">
			<CopyButton class="absolute right-2 top-[30px]" value={hslString} />
			<Label for="hsl">HSL</Label>
			<Input name="hsl" value={hslString} readonly />
		</div>
		<div class="relative grid gap-2">
			<CopyButton class="absolute right-2 top-[30px]" value={rgbString} />
			<Label for="rgb">RGB</Label>
			<Input name="rgb" value={rgbString} readonly />
		</div>
	</div>
</div>
