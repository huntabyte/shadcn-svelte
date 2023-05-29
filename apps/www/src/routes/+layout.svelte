<script lang="ts">
	import { dev } from "$app/environment";
	import { setInitialClassState } from "$components/docs/light-switch/light-switch";
	import Metadata from "$components/docs/Metadata.svelte";
	import SiteFooter from "$components/docs/SiteFooter.svelte";
	import SiteHeader from "$components/docs/SiteHeader.svelte";
	import TailwindIndicator from "$components/docs/TailwindIndicator.svelte";
	import "../styles/globals.css";
	import { inject } from "@vercel/analytics";

	inject({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
<Metadata />

<div class="relative flex min-h-screen flex-col">
	<SiteHeader />
	<div class="flex-1">
		<slot />
	</div>
	<SiteFooter />
	{#if dev}
		<TailwindIndicator />
	{/if}
</div>
