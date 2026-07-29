<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";

	let { children } = $props();
</script>

<div class="relative z-10 flex min-h-svh flex-col bg-background">
	<SiteHeader />
	<main class="flex flex-1 flex-col">
		<Tooltip.Provider>
			{@render children()}
		</Tooltip.Provider>
	</main>
	<SiteFooter />
</div>
