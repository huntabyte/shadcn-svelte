<script lang="ts">
	import SiteFooter from "$lib/components/docs/site-footer.svelte";
	import SiteHeader from "$lib/components/docs/site-header.svelte";
	import TailwindIndicator from "$lib/components/docs/tailwind-indicator.svelte";
	import { dev } from "$app/environment";
</script>

<SiteHeader />
<div class="flex-1">
	<slot />
</div>
<SiteFooter />
{#if dev}
	<TailwindIndicator />
{/if}
