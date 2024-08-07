<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import { colorData } from "$lib/components/colors/color-data.js";
	import * as RadioGroup from "$lib/registry/new-york/ui/radio-group/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";

	let selectedFormat = "hsl"; // Default color format

	function handleColorClick(colorName: string, shade: string, colorEntry: any) {
		const colorValue = colorEntry[selectedFormat];
		toast.success(`Copied "${colorValue}" to clipboard`);

		navigator.clipboard.writeText(colorValue).catch((err) => {
			toast.error(`Failed to copy ${colorName} ${shade} (${colorValue})`);
			console.error("Error copying to clipboard:", err);
		});
	}
</script>

<div class="mb-5 flex flex-col items-center gap-2">
	<div class="font-bold">Choose color format to copy:</div>
	<RadioGroup.Root bind:value={selectedFormat} class="flex flex-row gap-5">
		<div class="flex cursor-pointer items-center space-x-2">
			<RadioGroup.Item value="hsl" id="hsl-option" />
			<Label for="hsl-option">HSL</Label>
		</div>
		<div class="flex cursor-pointer items-center space-x-2">
			<RadioGroup.Item value="rgb" id="rgb-option" />
			<Label for="rgb-option">RGB</Label>
		</div>
		<div class="flex cursor-pointer items-center space-x-2">
			<RadioGroup.Item value="hex" id="hex-option" />
			<Label for="hex-option">Hex</Label>
		</div>
		<div class="flex cursor-pointer items-center space-x-2">
			<RadioGroup.Item value="className" id="class-name-option" />
			<Label for="class-name-option">Class Name</Label>
		</div>
		<RadioGroup.Input name="color-format" />
	</RadioGroup.Root>
</div>

<Card.Root>
	<div class="flex flex-col px-2 pt-5 md:px-5">
		{#each Object.entries(colorData) as [colorName, shades]}
			<div class="">
				<h2 class="my-2 capitalize md:text-xl">{colorName}</h2>

				<div class="overflox-x-auto mb-5 flex gap-1 md:gap-2">
					{#each Object.entries(shades) as [shade, colorEntry]}
						<button
							on:click={() => handleColorClick(colorName, shade, colorEntry)}
							class="group h-12 w-12 rounded-lg border transition-transform duration-200 sm:h-14 sm:w-14 md:h-20 md:w-20 md:hover:scale-[1.02] lg:h-32 lg:w-32"
							style="background-color: {colorEntry.hex};"
						>
							<div class="h-full w-full" title="{colorName} {shade}"></div>
							<div
								class="md:group-hover:text-foreground text-foreground/[70%] text-xs sm:text-sm md:text-base"
							>
								{shade}
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Card.Root>
