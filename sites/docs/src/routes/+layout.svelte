<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/state";
	import Metadata from "$lib/components/docs/metadata.svelte";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import "../styles/carbon.pcss";
	import { config } from "$lib/stores/index.js";
	import { Toaster as DefaultSonner } from "$lib/registry/default/ui/sonner/index.js";
	import { Toaster as NYSonner } from "$lib/registry/new-york/ui/sonner/index.js";
	import { setPackageManager } from "$lib/stores/package-manager.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";

	let { children } = $props();

	setPackageManager();

	$effect(() => {
		updateTheme($config.theme, page.url.pathname);
	});
</script>

<ModeWatcher />
<Metadata />
{#if $config.style === "new-york"}
	<NYSonner />
{:else}
	<DefaultSonner />
{/if}
<Tooltip.Provider>
	<div
		class="bg-background relative flex min-h-screen flex-col"
		id="page"
		data-vaul-drawer-wrapper
	>
		{@render children?.()}
	</div>
</Tooltip.Provider>
