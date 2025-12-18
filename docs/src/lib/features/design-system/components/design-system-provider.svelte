<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import {
		buildRegistryTheme,
		DEFAULT_CONFIG,
		fonts,
		RADII,
		type DesignSystemConfig,
	} from "$lib/registry/config.js";
	import { browser } from "$app/environment";
	import { watch } from "runed";
	import { setupDesignSystem } from "./design-system-provider-state.svelte.js";

	const uid = $props.id();

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const designSystem = setupDesignSystem();

	const radius = $derived(
		RADII.find((radius) => radius.name === designSystem.radius)?.value ?? RADII[0].value
	);

	const registryTheme = $derived.by(() => {
		if (!designSystem.baseColor || !designSystem.theme || !designSystem.menuAccent || !radius) {
			return null;
		}

		const config: DesignSystemConfig = {
			...DEFAULT_CONFIG,
			baseColor: designSystem.baseColor,
			theme: designSystem.theme,
			menuAccent: designSystem.menuAccent,
			radius: designSystem.radius,
		};

		return buildRegistryTheme(config);
	});

	watch([() => registryTheme, () => browser], ([registryTheme, browser]) => {
		if (!browser) return;
		if (!registryTheme) return;
		const styleId = uid;
		let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;

		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = styleId;
			document.head.appendChild(styleElement);
		}

		const { light: lightVars, dark: darkVars, theme: themeVars } = registryTheme.cssVars;

		let cssText = ":root {\n";
		const selectedFont = fonts.find((font) => font.name.replace("font-", "") === designSystem.font)?.font.family ?? fonts[0].font.family
		cssText += `  --font-sans: ${selectedFont};\n`;
		// Add theme vars (shared across light/dark).
		if (themeVars) {
			Object.entries(themeVars).forEach(([key, value]) => {
				if (value) {
					cssText += `  --${key}: ${value};\n`;
				}
			});
		}
		// Add light mode vars.
		if (lightVars) {
			Object.entries(lightVars).forEach(([key, value]) => {
				if (value) {
					cssText += `  --${key}: ${value};\n`;
				}
			});
		}
		cssText += "}\n\n";

		cssText += ".dark {\n";
		if (darkVars) {
			Object.entries(darkVars).forEach(([key, value]) => {
				if (value) {
					cssText += `  --${key}: ${value};\n`;
				}
			});
		}
		cssText += "}\n";

		styleElement.textContent = cssText;
	});
</script>

<div
	data-slot="design-system-provider"
	style="display: contents;"
	class={cn(`style-${designSystem.style} base-color-${designSystem.baseColor}`)}
>
	{@render children?.()}
</div>
