<script lang="ts">
  import { dev } from "$app/environment";
  import SiteFooter from "$components/docs/SiteFooter.svelte";
  import SiteHeader from "$components/docs/SiteHeader.svelte";
  import TailwindIndicator from "$components/docs/TailwindIndicator.svelte";
  import "../styles/globals.css";
</script>

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
