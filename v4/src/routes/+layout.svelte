<script lang="ts">
	import "../app.css";
	import { mode, ModeWatcher, setTheme } from "mode-watcher";
	import { untrack } from "svelte";
	import Sonner from "$lib/registry/ui/sonner/sonner.svelte";
	import { setPackageManagerContext } from "$lib/package-manager.js";
	import { setInstallationTypeContext } from "$lib/installation-type.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

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

	const COOKIE_NAME = "active_theme";

	setTheme(data.activeTheme ?? "default");

	$effect.pre(() => {
		const theme = data.activeTheme ?? "default";
		untrack(() => {
			setTheme(theme);
			document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`;
		});
	});

	setPackageManagerContext(() => data.packageManager);
	setInstallationTypeContext(() => data.installationType);
</script>

<ModeWatcher
	defaultMode="system"
	disableTransitions
	defaultTheme={data.activeTheme ?? "default"}
	{themeColors}
	darkClassNames={["dark", ...themeClassNames]}
	lightClassNames={["light", ...themeClassNames]}
/>
<Sonner theme={mode.current} position="top-center" />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
