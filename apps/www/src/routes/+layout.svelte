<script lang="ts">
	import { dev } from "$app/environment";
	import { setInitialClassState } from "$components/docs/light-switch/light-switch";
	import Metadata from "$components/docs/Metadata.svelte";
	import SiteFooter from "$components/docs/SiteFooter.svelte";
	import SiteHeader from "$components/docs/SiteHeader.svelte";
	import TailwindIndicator from "$components/docs/TailwindIndicator.svelte";
	import "../styles/globals.css";
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte to error for some reason... so ignoring this entire file for now -->
	{@html `<script nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
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
