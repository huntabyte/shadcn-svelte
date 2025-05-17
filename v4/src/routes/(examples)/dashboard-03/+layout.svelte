<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import AppSidebar from "./components/app-sidebar.svelte";
	import SiteHeader from "./components/site-header.svelte";

	let { data, children } = $props();
</script>

<main style="--header-height:calc(theme(spacing.14))">
	<Sidebar.Provider open={data.sidebarState} class="flex flex-col">
		<SiteHeader />
		<div class="flex flex-1">
			<AppSidebar />
			<Sidebar.Inset>
				{@render children()}
			</Sidebar.Inset>
		</div>
	</Sidebar.Provider>
</main>
