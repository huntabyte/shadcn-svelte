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

	const themeColors = { light: "#ffffff", dark: "#09090b" };

	const themeClassName = $derived(`theme-${userConfig.current.activeTheme}`);

	watch.pre(
		() => userConfig.current.activeTheme,
		() => {
			setTheme(userConfig.current.activeTheme);
		}
	);
</script>

<ModeWatcher
	defaultMode="system"
	disableTransitions
	defaultTheme={userConfig.current.activeTheme}
	{themeColors}
	darkClassNames={["dark", `layout-${userConfig.current.layout}`, themeClassName]}
	lightClassNames={["light", `layout-${userConfig.current.layout}`, themeClassName]}
/>
<Toaster position="top-center" />
<Tooltip.Provider>
	{@render children()}
</Tooltip.Provider>
