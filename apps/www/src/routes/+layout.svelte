<script lang="ts">
	import { page } from "$app/stores";
	import { dev, browser } from "$app/environment";
	import { env } from "$env/dynamic/public";
	import {
		Metadata,
		SiteFooter,
		SiteHeader,
		TailwindIndicator
	} from "$components/docs";
	import { updateTheme } from "@/utils";
	import "../styles/globals.css";
	import { config } from "@/stores";
	import * as Fathom from "fathom-client";
	import { onMount } from "svelte";
	import { ModeWatcher } from "mode-watcher";

	onMount(async () => {
		if (env.PUBLIC_FATHOM_ID && env.PUBLIC_FATHOM_URL) {
			Fathom.load(env.PUBLIC_FATHOM_ID, {
				url: env.PUBLIC_FATHOM_URL
			});
		}
	});

	$: updateTheme($config.theme, $page.url.pathname);
	$: $page.url.pathname, browser && Fathom.trackPageview();
</script>

<ModeWatcher />

<Metadata />

<div class="relative flex min-h-screen flex-col" id="page">
	<SiteHeader />
	<div class="flex-1">
		<slot />
	</div>
	<SiteFooter />
	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
