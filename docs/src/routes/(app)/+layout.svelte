<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { DesignSystemProvider } from "$lib/features/design-system/index.js";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";

	let { children, data } = $props();

	// svelte-ignore state_referenced_locally
	UserConfigContext.set(new UserConfig(data.userConfig));
</script>

<ModeWatcher defaultMode="system" disableTransitions />

<Tooltip.Provider>
	<DesignSystemProvider>
		<Toaster position="top-center" />
		{@render children()}
	</DesignSystemProvider>
</Tooltip.Provider>
