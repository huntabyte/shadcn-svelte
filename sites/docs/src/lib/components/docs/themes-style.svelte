<svelte:options runes />

<script lang="ts">
	import { themesConfig } from "$lib/stores/themes-config.js";
</script>

{#if themesConfig.current.activeTheme}
	<!-- eslint-disable-next-line svelte/no-at-html-tags-->
	{@html `<style>
.themes-wrapper,
[data-chart] {
  ${Object.entries(themesConfig.current.activeTheme.cssVars.light)
		.map(([key, value]) => `${key}: hsla(${value});`)
		.join("\n")}
}

.dark .themes-wrapper,
.dark [data-chart] {
  ${Object.entries(themesConfig.current.activeTheme.cssVars.dark)
		.map(([key, value]) => `${key}: hsla(${value});`)
		.join("\n")}
}
</style>
`}
{/if}
