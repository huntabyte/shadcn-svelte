<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import Metadata from "$lib/components/docs/metadata.svelte";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import "../styles/carbon.css";
	import { setConfigContext } from "$lib/config-state.js";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { dev } from "$app/environment";
	import TailwindIndicator from "$lib/components/docs/tailwind-indicator.svelte";
	import { setPackageManagerContext } from "$lib/package-manager.js";

	let { children, data } = $props();

	const config = setConfigContext(() => data.config);
	setPackageManagerContext(() => data.packageManager);

	$effect(() => {
		updateTheme(config.current.theme, page.url.pathname);
	});
</script>

<ModeWatcher disableTransitions />
<Metadata />
<Toaster />
<Tooltip.Provider>
	<div data-vaul-drawer-wrapper="">
		<div class="bg-background relative flex min-h-dvh flex-col" id="page">
			{@render children?.()}
		</div>
	</div>
	{#if dev}
		<TailwindIndicator />
	{/if}
</Tooltip.Provider>
