<script lang="ts">
	import { CopyButton } from "./index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { hexToHsl, hexToRgb } from "$lib/utils.js";

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
	class="ring-offset-background focus-visible:ring-ring mt-2 flex h-[300px] items-center justify-center rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
>
	<div class="mx-auto w-full max-w-sm space-y-6 py-4">
		<div class="grid gap-2">
			<Label for="hex">HEX</Label>
			<Input name="hex" bind:value={hex} maxlength={7} />
		</div>
		<div class="relative grid gap-2">
			<Label for="hsl">HSL</Label>
			<Input name="hsl" value={hslString} readonly />
			<CopyButton
				class="text-primary hover:bg-accent hover:text-primary absolute right-2 top-[28.5px]"
				value={hslString}
			/>
		</div>
		<div class="relative grid gap-2">
			<Label for="rgb">RGB</Label>
			<Input name="rgb" value={rgbString} readonly />
			<CopyButton
				class="text-primary hover:bg-accent hover:text-primary absolute right-2 top-[28.5px]"
				value={rgbString}
			/>
		</div>
	</div>
</div>
