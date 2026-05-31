<script lang="ts">
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let { children } = $props();
</script>

<div class="bg-background relative z-10 flex min-h-svh flex-col">
	<SiteHeader />
	<main class="flex flex-1 flex-col">
		<Tooltip.Provider>
			{@render children()}
		</Tooltip.Provider>
	</main>
	<SiteFooter />
</div>
