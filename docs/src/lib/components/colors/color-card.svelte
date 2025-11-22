<script lang="ts">
	import { toast } from "svelte-sonner";
	import { PersistedState } from "runed";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { AspectRatio } from "$lib/registry/ui/aspect-ratio/index.js";
	import { getColors, type ColorPalette } from "$lib/components/colors/colors.js";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { scale } from "svelte/transition";

	type Format = {
		format: string;
		hint: string;
	};

	const formats: Format[] = [
		{
			format: "className",
			hint: "bg-slate-100",
		},
		{
			format: "hex",
			hint: "#f8fafc",
		},
		{
			format: "rgb",
			hint: "248 250 252",
		},
		{
			format: "hsl",
			hint: "210 40% 98%",
		},
		{
			format: "oklch",
			hint: "0.98 0.00 248",
		},
	] as const;

	const selectedFormat = new PersistedState("color-format-preference", formats[0].format);

	const colors = getColors();

	let copied = $state<string>();

	async function copy(shade: ColorPalette["colors"][number]) {
		copied = shade.className;

		const text = shade[selectedFormat.current as never] as string;

		await navigator.clipboard.writeText(text);

		toast.success(`Copied ${text} to clipboard!`);

		setTimeout(() => {
			copied = undefined;
		}, 1000);
	}
</script>

<div class="flex w-full flex-col gap-8">
	{#each colors as color (color.name)}
		<div class="flex w-full flex-col gap-2 rounded-lg border p-2">
			<div class="flex place-items-center justify-between">
				<h2>{`${color.name[0].toUpperCase()}${color.name.slice(1)}`}</h2>
				<Select.Root type="single" bind:value={selectedFormat.current}>
					<Select.Trigger class="h-7 w-fit text-xs">
						<span class="me-2">
							<span class="font-bold">Format:</span>
							<span class="text-muted-foreground font-mono"
								>{selectedFormat.current}</span
							>
						</span>
					</Select.Trigger>
					<Select.Content align="end">
						{#each formats as format (format.format)}
							<Select.Item value={format.format}>
								<span>
									<span>{format.format}</span>
									<span class="text-muted-foreground font-mono"
										>{format.hint}</span
									>
								</span>
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col place-items-end md:flex-row md:gap-2">
				{#each color.colors as shade (shade.className)}
					<button
						type="button"
						onclick={() => copy(shade)}
						class="group w-full flex-1 shrink-0 md:h-full md:w-auto"
					>
						<div class="relative">
							<div class="hidden md:block">
								<AspectRatio ratio={12 / 16}>
									<div
										class="size-full rounded-lg"
										style="background-color: {shade.hex};"
									></div>
								</AspectRatio>
							</div>
							<div
								class="block h-36 w-full rounded-lg md:hidden"
								style="background-color: {shade.hex};"
							></div>

							<div
								class="absolute end-2 top-2 opacity-0 transition-all group-hover:opacity-100"
								style="color: {shade.foreground};"
							>
								{#if copied === shade.className}
									<div in:scale>
										<CheckIcon class="size-4" />
									</div>
								{:else}
									<div in:scale>
										<ClipboardIcon class="size-4" />
									</div>
								{/if}
							</div>
						</div>

						<span
							class="group-hover:text-foreground text-muted-foreground hidden text-nowrap py-1 font-mono text-sm transition-colors xl:block"
						>
							{shade.className}
						</span>
						<span
							class="group-hover:text-foreground text-muted-foreground block text-nowrap py-1 font-mono text-sm transition-colors xl:hidden"
						>
							{shade.className.split("-")[1]}
						</span>
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>
