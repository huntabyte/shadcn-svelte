<script lang="ts">
	import SiteFooter from "$lib/components/docs/site-footer.svelte";
	import SiteHeader from "$lib/components/docs/site-header.svelte";

	let { children } = $props();
</script>

<div data-wrapper="" class="border-grid flex flex-1 flex-col">
	<SiteHeader />
	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
	<SiteFooter />
</div>
