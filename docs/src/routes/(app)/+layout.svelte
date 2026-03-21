<script lang="ts">
	import { DirectionContext } from "$lib/localization.svelte.js";
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";

	let { children, data } = $props();

	// svelte-ignore state_referenced_locally
	const userConfig = UserConfigContext.set(new UserConfig(data.userConfig));

	DirectionContext.set({
		get current() {
			return userConfig.current.direction;
		},
	});
</script>

<ModeWatcher defaultMode="system" disableTransitions />
<Toaster position="top-center" />

<DesignSystemProvider>
	{@render children()}
</DesignSystemProvider>
