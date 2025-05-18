<script lang="ts">
	import { docsConfig } from "$lib/config/docs.js";
	import DocsNav from "$lib/components/docs/docs-nav/docs-nav.svelte";

	let { children } = $props();
</script>

<div class="container-wrapper">
	<div
		class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
	>
		<aside
			class="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block"
		>
			<div class="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
				<DocsNav config={docsConfig} />
			</div>
		</aside>
		{@render children?.()}
	</div>
</div>
