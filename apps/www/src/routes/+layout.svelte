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
	import { setInitialClassState } from "$components/docs/light-switch/light-switch";
	import { updateTheme } from "@/utils";
	import "../styles/globals.css";
	import { config } from "@/stores";
	import * as Fathom from "fathom-client";
	import { onMount } from "svelte";

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

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
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
