<script lang="ts">
	import Metadata from "$lib/components/metadata.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import AppSidebar from "./components/app-sidebar.svelte";
	import ChartAreaInteractive from "./components/chart-area-interactive.svelte";
	import DataTable from "./components/data-table.svelte";
	import SectionCards from "./components/section-cards.svelte";
	import SiteHeader from "./components/site-header.svelte";
	import { data } from "./data.js";

	const title = "Dashboard";
	const description = "A dashboard built using the components.";
</script>

<Metadata
	{title}
	{description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
	}}
/>

<div class="md:hidden">
	<img
		src="/img/examples/dashboard-light.png"
		width={1280}
		height={843}
		alt="Dashboard"
		class="block dark:hidden"
	/>
	<img
		src="/img/examples/dashboard-dark.png"
		width={1280}
		height={843}
		alt="Dashboard"
		class="hidden dark:block"
	/>
</div>
<Sidebar.Provider
	class="hidden md:flex"
	style="--sidebar-width: calc(var(--spacing) * 64); --header-height: calc(var(--spacing) * 12 + 1px);"
>
	<AppSidebar variant="sidebar" />
	<Sidebar.Inset>
		<SiteHeader />
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SectionCards />
					<div class="px-4 lg:px-6">
						<ChartAreaInteractive />
					</div>
					<DataTable {data} />
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
