<script lang="ts">
	import type { PageData } from "./$types.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let { data }: { data: PageData } = $props();

	const FEATURED_BLOCKS = ["dashboard-01", "sidebar-07", "sidebar-03", "login-03", "login-04"];
</script>

<div>
	{#each FEATURED_BLOCKS as block (block)}
		<div class="border-grid container border-b py-8 first:pt-6 last:border-b-0 md:py-12">
			<BlockDisplay name={block} />
		</div>
	{/each}
	<div class="container-wrapper">
		<div class="container flex justify-center py-6">
			<Button href="/blocks/sidebar" variant="outline">Browse all blocks</Button>
		</div>
	</div>
</div>
