<script lang="ts">
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
	import { cn } from "$lib/registry/lib/utils.js";
	import { toggleMode } from "mode-watcher";

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

		const body = document.body;

		// Update style class in place (remove old, add new).
		body.classList.forEach((className) => {
			if (className.startsWith("style-")) {
				body.classList.remove(className);
			}
		});
		body.classList.add(`style-${designSystem.style}`);

		// Update base color class in place.
		body.classList.forEach((className) => {
			if (className.startsWith("base-color-")) {
				body.classList.remove(className);
			}
		});
		body.classList.add(`base-color-${designSystem.baseColor}`);

		const selectedFont =
			fonts.find((font) => font.name.replace("font-", "") === designSystem.font)?.font
				.family ?? fonts[0].font.family;
		document.documentElement.style.setProperty("--font-sans", selectedFont);

		const styleId = uid;
		let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;

		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = styleId;
			document.head.appendChild(styleElement);
		}

		const { light: lightVars, dark: darkVars, theme: themeVars } = registryTheme.cssVars;

		let cssText = ":root {\n";
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

	function handleKeyDown(e: KeyboardEvent) {
		// randomize on r/R
		if ((e.key === "r" || e.key === "R") && !e.metaKey && !e.ctrlKey) {
			if (
				(e.target instanceof HTMLElement && e.target.isContentEditable) ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement ||
				e.target instanceof HTMLSelectElement
			) {
				return;
			}

			e.preventDefault();
			designSystem.randomize();
		}

		// toggle theme on d/D
		if ((e.key === "d" || e.key === "D") && !e.metaKey && !e.ctrlKey) {
			if (
				(e.target instanceof HTMLElement && e.target.isContentEditable) ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement ||
				e.target instanceof HTMLSelectElement
			) {
				return;
			}

			e.preventDefault();
			toggleMode();
		}

		// undo/redo on z/Z
		if ((e.key === "z" || e.key === "Z") && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			if (e.shiftKey) {
				designSystem.redo();
			} else {
				designSystem.undo();
			}
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div
	data-slot="design-system-provider"
	style="display: contents;"
	class={cn(`style-${designSystem.style} base-color-${designSystem.baseColor}`)}
>
	{@render children?.()}
</div>
