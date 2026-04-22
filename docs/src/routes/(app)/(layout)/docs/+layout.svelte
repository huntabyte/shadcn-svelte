<script lang="ts">
	import DocsSidebar from "$lib/components/docs-sidebar.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { sidebarNavItems } from "$lib/config.js";
	let { children } = $props();
</script>

<div class="container-wrapper flex flex-1 flex-col px-2">
	<Sidebar.Provider
		class="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
		style="--sidebar-width: calc(var(--spacing) * 72)"
	>
		<DocsSidebar navItems={sidebarNavItems} />
		<div class="h-full w-full">{@render children()}</div>
	</Sidebar.Provider>
</div>
