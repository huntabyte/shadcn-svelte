<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import Metadata from "$lib/components/docs/metadata.svelte";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import "../styles/carbon.css";
	import { config } from "$lib/stores/index.js";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { setPackageManager } from "$lib/stores/package-manager.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { dev } from "$app/environment";
	import TailwindIndicator from "$lib/components/docs/tailwind-indicator.svelte";

	let { children } = $props();

	setPackageManager();

	$effect(() => {
		updateTheme($config.theme, page.url.pathname);
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
