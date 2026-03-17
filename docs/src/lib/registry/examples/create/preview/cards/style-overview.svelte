<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { getFont, getStyle } from "$lib/registry/config.js";

	const designSystem = useDesignSystem();
	const currentFont = $derived(getFont(designSystem.font));
	const currentStyle = $derived(getStyle(designSystem.style));

	const colorVariants = [
		"--background",
		"--foreground",
		"--primary",
		"--secondary",
		"--muted",
		"--accent",
		"--destructive",
		"--chart-1",
		"--chart-2",
		"--chart-3",
		"--chart-4",
		"--chart-5",
	];
</script>

<Card.Root>
	<Card.Content class="flex flex-col gap-6">
		<div class="flex flex-col gap-1">
			<div class="text-2xl font-medium">
				{currentStyle?.title ?? "Vega"} - {currentFont?.title ?? "Inter"}
			</div>
			<div class="text-muted-foreground line-clamp-2 text-base">
				Designers love packing quirky glyphs into test phrases. This is a preview of the
				typography styles.
			</div>
		</div>
		<div class="grid grid-cols-6 gap-3">
			{#each colorVariants as variant (variant)}
				<div
					class="flex flex-col flex-wrap items-center gap-2"
					style="--color: var({variant})"
				>
					<div
						class="after:border-border relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:mix-blend-darken dark:after:mix-blend-lighten"
					></div>
					<div class="hidden max-w-14 truncate font-mono text-[0.60rem] md:block">
						{variant}
					</div>
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
