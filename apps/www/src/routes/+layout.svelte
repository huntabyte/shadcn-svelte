<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import { page } from "$app/stores";
	import { Metadata } from "$lib/components/docs/index.js";
	import { updateTheme } from "$lib/utils.js";
	import "../styles/globals.css";
	import { config } from "$lib/stores/index.js";
	import { Toaster as DefaultSonner } from "$lib/registry/default/ui/sonner/index.js";
	import { Toaster as NYSonner } from "$lib/registry/new-york/ui/sonner/index.js";

	$: updateTheme($config.theme, $page.url.pathname);
</script>

<ModeWatcher />
<Metadata />
{#if $config.style === "new-york"}
	<NYSonner />
{:else}
	<DefaultSonner />
{/if}

<div class="relative flex min-h-screen flex-col bg-background" id="page" data-vaul-drawer-wrapper>
	<slot />
</div>
