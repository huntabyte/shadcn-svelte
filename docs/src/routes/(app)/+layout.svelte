<script lang="ts">
	import { ModeWatcher, toggleMode } from "mode-watcher";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { Toaster as ToastToaster } from "$lib/registry/ui/toast/index.js";
	import { UserConfig, UserConfigContext } from "$lib/user-config.svelte.js";

	let { children, data } = $props();

	// svelte-ignore state_referenced_locally
	UserConfigContext.set(new UserConfig(data.userConfig));

	function handleKeyDown(e: KeyboardEvent) {
		if ((e.key !== "d" && e.key !== "D") || e.metaKey || e.ctrlKey) return;
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
</script>

<svelte:window onkeydown={handleKeyDown} />

<ModeWatcher defaultMode="system" disableTransitions />

<Tooltip.Provider>
	<Toaster position="top-center" />
	<ToastToaster />
	{@render children()}
</Tooltip.Provider>
