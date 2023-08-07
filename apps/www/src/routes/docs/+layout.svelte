<script lang="ts">
	import { DocsSidebarNav } from "$components/docs";
	import { docsConfig } from "$lib/config/docs";
</script>

<div class="border-b">
	<div
		class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
	>
		<aside
			class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto"
		>
			<div class="h-full py-6 pl-8 pr-6 lg:py-8">
				<DocsSidebarNav items={docsConfig.sidebarNav} />
			</div>
		</aside>
		<slot />
	</div>
</div>
