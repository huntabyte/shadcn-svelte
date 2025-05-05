<script lang="ts">
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import ModeSwitcher from "$lib/components/mode-switcher.svelte";
	import NavHeader from "$lib/components/nav-header.svelte";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";

	let { data, children } = $props();
</script>

<Sidebar.Provider open={data.sidebarState}>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b"
		>
			<div class="flex h-14 w-full items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1.5" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<NavHeader />
				<div class="ml-auto flex items-center gap-2">
					<ThemeSelector />
					<ModeSwitcher />
				</div>
			</div>
		</header>
		{@render children?.()}
	</Sidebar.Inset>
</Sidebar.Provider>
