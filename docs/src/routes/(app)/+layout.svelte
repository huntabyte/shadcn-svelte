<script lang="ts">
	import { watch } from "runed";
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";
	import { ModeWatcher, setTheme } from "mode-watcher";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";

	let { children, data } = $props();

	const userConfig = UserConfigContext.set(new UserConfig(data.userConfig));

	const themeColors = { light: "#ffffff", dark: "#09090b" };
	const modeClasses = $derived([
		`layout-${userConfig.current.layout}`,
		`theme-${userConfig.current.activeTheme}`,
	]);

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
	darkClassNames={["dark", ...modeClasses]}
	lightClassNames={["light", ...modeClasses]}
/>
<Toaster position="top-center" />

{@render children()}