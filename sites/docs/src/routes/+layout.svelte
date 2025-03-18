<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import Metadata from "$lib/components/docs/metadata.svelte";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import "../styles/carbon.pcss";
	import { config } from "$lib/stores/index.js";
	import { Toaster } from "$lib/registry/ui/sonner/index.js";
	import { setPackageManager } from "$lib/stores/package-manager.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let { children } = $props();

	setPackageManager();

	$effect(() => {
		updateTheme($config.theme, page.url.pathname);
	});
</script>

<ModeWatcher />
<Metadata />
<Toaster />
<Tooltip.Provider>
	<div
		class="bg-background relative flex min-h-screen flex-col"
		id="page"
		data-vaul-drawer-wrapper
	>
		{@render children?.()}
	</div>
</Tooltip.Provider>
