<!--
	Applies the theme picked with `ThemeSelector` to everything inside `.theme-container`.
	This replaces the site-wide DesignSystemProvider on the docs, which only exists on the
	/create and /preview routes now.
-->
<script lang="ts">
	import { THEMES } from "$lib/registry/themes.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	const uid = $props.id();
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

	$effect(() => {
		let styleElement = document.getElementById(uid) as HTMLStyleElement | null;
		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = uid;
			document.head.appendChild(styleElement);
		}
		styleElement.textContent = css;

		return () => {
			styleElement.remove();
		};
	});
</script>
