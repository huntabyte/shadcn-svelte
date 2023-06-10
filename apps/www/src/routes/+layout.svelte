<script lang="ts">
	import { dev } from "$app/environment";
	import {
		Metadata,
		SiteFooter,
		SiteHeader,
		TailwindIndicator
	} from "$components/docs";
	import { setInitialClassState } from "$components/docs/light-switch/light-switch";
	import "../styles/globals.css";
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
<Metadata />

<SiteHeader />
<div class="flex-1">
	<slot />
</div>
<SiteFooter />
{#if dev}
	<TailwindIndicator />
{/if}
