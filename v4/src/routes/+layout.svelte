<script lang="ts">
	import "../app.css";
	import { mode, ModeWatcher, setTheme, theme } from "mode-watcher";
	import Sonner from "$lib/registry/ui/sonner/sonner.svelte";
	import { setPackageManagerContext } from "$lib/package-manager.js";
	import { setInstallationTypeContext } from "$lib/installation-type.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { setLayoutContext } from "$lib/layout.js";
	import { useCookie } from "$lib/hooks/use-cookie.svelte.js";
	import { watch } from "runed";
	import { setColorFormatContext } from "$lib/color-format.js";
	import { ActiveThemeContext } from "$lib/active-theme.js";

	let { children, data } = $props();

	const isScaled = $derived(data.activeTheme?.endsWith("scaled"));

	const themeColors = {
		light: "#ffffff",
		dark: "#09090b",
	};

	const themeClassNames = $derived([
		data.activeTheme ? `theme-${data.activeTheme}` : "",
		isScaled ? "theme-scaled" : "",
	]);

	setTheme(data.activeTheme ?? "default");

	setPackageManagerContext(() => data.packageManager);
	setInstallationTypeContext(() => data.installationType);
	setColorFormatContext(() => data.colorFormat);
	let activeThemeValue = $state({ current: data.activeTheme ?? "default" });
	const ctxActiveTheme = ActiveThemeContext.set(activeThemeValue);
	const layout = setLayoutContext(() => data.layout);

	useCookie({
		value: () => theme.current ?? data.activeTheme,
		name: "active_theme",
	});

	watch.pre(
		() => ctxActiveTheme.current,
		() => {
			setTheme(ctxActiveTheme.current ?? "default");
		}
	);

	watch.pre(
		() => layout.current,
		(curr, prev) => {
			if (document.documentElement.classList.contains(`layout-${prev}`)) {
				document.documentElement.classList.remove(`layout-${prev}`);
			}
			document.documentElement.classList.add(`layout-${curr}`);
		}
	);
</script>

<ModeWatcher
	defaultMode="system"
	disableTransitions
	defaultTheme={data.activeTheme}
	{themeColors}
	darkClassNames={["dark", `layout-${layout.current}`, ...themeClassNames]}
	lightClassNames={["light", `layout-${layout.current}`, ...themeClassNames]}
/>
<Sonner theme={mode.current} position="top-center" />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
