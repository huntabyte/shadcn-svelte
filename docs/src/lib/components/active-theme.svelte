<!--
	Applies the theme picked with `ThemeSelector` to everything inside `.theme-container`.
	This replaces the site-wide DesignSystemProvider on the docs, which only exists on the
	/create and /preview routes now.
-->
<script lang="ts">
	import { THEMES } from "$lib/registry/themes.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	const userConfig = UserConfigContext.get();

	const theme = $derived(THEMES.find((t) => t.name === userConfig.current.activeTheme));

	function toDeclarations(vars: Record<string, string> | undefined): string {
		return Object.entries(vars ?? {})
			.filter(([, value]) => Boolean(value))
			.map(([key, value]) => `--${key}: ${value};`)
			.join("\n");
	}

	const css = $derived(
		theme
			? `.theme-container {\n${toDeclarations(theme.cssVars?.light as Record<string, string>)}\n}\n.dark .theme-container {\n${toDeclarations(theme.cssVars?.dark as Record<string, string>)}\n}`
			: ""
	);
</script>

<svelte:head>
	{#if css}
		<!-- The CSS is generated from our own static theme table, so it is safe to inject. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<style>${css}</style>`}
	{/if}
</svelte:head>
