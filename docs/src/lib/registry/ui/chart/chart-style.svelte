<script lang="ts">
	import { THEMES, type ChartConfig } from "./chart-utils.js";

	let { id, config }: { id: string; config: ChartConfig } = $props();

	const colorConfig = $derived(
		config ? Object.entries(config).filter(([, config]) => config.theme || config.color) : null
	);

	const styleOpen = ">elyts<".split("").reverse().join("");
	const styleClose = ">elyts/<".split("").reverse().join("");
</script>

{#if colorConfig && colorConfig.length}
	{@const themeContents = Object.entries(THEMES)
		.map(
			([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join("\n")}
}
`
		)
		.join("\n")}

	{#key id}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `${styleOpen}
		${themeContents}
	${styleClose}`}
	{/key}
{/if}
