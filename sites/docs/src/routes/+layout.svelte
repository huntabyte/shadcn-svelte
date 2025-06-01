<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/stores";
	import { Metadata } from "$lib/components/docs/index.js";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import "../styles/carbon.pcss";
	import { config } from "$lib/stores/index.js";
	import { Toaster as DefaultSonner } from "$lib/registry/default/ui/sonner/index.js";
	import { Toaster as NYSonner } from "$lib/registry/new-york/ui/sonner/index.js";
	import { setPackageManager } from "$lib/stores/package-manager.js";

	setPackageManager();

	$: updateTheme($config.theme, $page.url.pathname);
</script>

<ModeWatcher />
<Metadata />
{#if $config.style === "new-york"}
	<NYSonner />
{:else}
	<DefaultSonner />
{/if}

<div class="bg-background relative flex min-h-screen flex-col" id="page" data-vaul-drawer-wrapper>
	<slot />
</div>
