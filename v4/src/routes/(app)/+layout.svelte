<script lang="ts">
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";

	let { children } = $props();
</script>

<div class="bg-background relative z-10 flex min-h-svh flex-col">
	<SiteHeader />
	<main class="flex flex-1 flex-col">{@render children()}</main>
	<SiteFooter />
</div>
