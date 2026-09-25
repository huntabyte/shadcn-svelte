<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";

	let { children } = $props();
</script>

<div
	data-slot="layout"
	class="group/layout relative z-10 flex min-h-svh flex-col bg-background has-data-[slot=designer]:h-svh has-data-[slot=designer]:overflow-hidden"
>
	<SiteHeader />
	<main class="flex min-h-0 flex-1 flex-col">
		<Tooltip.Provider>
			{@render children()}
		</Tooltip.Provider>
	</main>
	<SiteFooter />
</div>
