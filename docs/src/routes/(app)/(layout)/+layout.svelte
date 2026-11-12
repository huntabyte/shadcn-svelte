<script lang="ts">
	import { onMount } from "svelte";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import SiteFooter from "$lib/components/site-footer.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import { syncMenuColor } from "$lib/features/design-system/index.js";
	import { DEFAULT_CONFIG } from "$lib/registry/config.js";

	let { children } = $props();

	// The design system provider only runs on /create and /preview, so apply the default menu
	// color here. Otherwise menus keep `cn-menu-translucent`, which overrides destructive items.
	onMount(() => syncMenuColor(DEFAULT_CONFIG.menuColor));
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
