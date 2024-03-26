<script lang="ts">
	import { SiteFooter, SiteHeader, TailwindIndicator } from "$lib/components/docs/index.js";
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
