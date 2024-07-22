<script lang="ts">
	import { ScrollArea } from "$lib/registry/new-york/ui/scroll-area/index.js";
	import { DocsSidebarNav } from "$lib/components/docs/index.js";
	import { docsConfig } from "$lib/config/docs.js";
</script>

<div class="border-b">
	<div
		class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
	>
		<aside
			class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
		>
			<ScrollArea class="h-full py-6 pr-6 lg:py-8">
				<DocsSidebarNav items={docsConfig.sidebarNav} />
			</ScrollArea>
		</aside>
		<slot />
	</div>
</div>
