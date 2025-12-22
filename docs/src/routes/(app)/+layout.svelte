<script lang="ts">
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";

	let { children, data } = $props();

	UserConfigContext.set(new UserConfig(data.userConfig));
</script>

<ModeWatcher defaultMode="system" disableTransitions />
<Toaster position="top-center" />

<DesignSystemProvider>
	{@render children()}
</DesignSystemProvider>
