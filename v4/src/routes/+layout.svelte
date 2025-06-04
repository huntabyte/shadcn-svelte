<script lang="ts">
	import "../app.css";
	import { ModeWatcher, setTheme } from "mode-watcher";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { watch } from "runed";
	import { parseUserConfig, UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";

	let { children, data } = $props();

	const userConfig = UserConfigContext.set(
		new UserConfig(
			typeof document !== "undefined" ? parseUserConfig(document.cookie) : data.userConfig
		)
	);

	const isScaled = $derived(userConfig.current.activeTheme.endsWith("scaled"));

	const themeColors = {
		light: "#ffffff",
		dark: "#09090b",
	};

	const themeClassNames = $derived([
		userConfig.current.activeTheme ? `theme-${userConfig.current.activeTheme}` : "",
		isScaled ? "theme-scaled" : "",
	]);

	setTheme(userConfig.current.activeTheme);

	watch.pre(
		() => userConfig.current.activeTheme,
		() => {
			setTheme(userConfig.current.activeTheme);
		}
	);

	watch.pre(
		() => userConfig.current.layout,
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
	defaultTheme={userConfig.current.activeTheme}
	{themeColors}
	darkClassNames={["dark", `layout-${userConfig.current.layout}`, ...themeClassNames]}
	lightClassNames={["light", `layout-${userConfig.current.layout}`, ...themeClassNames]}
/>
<Toaster position="top-center" />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
