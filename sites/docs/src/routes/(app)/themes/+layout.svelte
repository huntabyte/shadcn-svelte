<script lang="ts">
	import Announcement from "$lib/components/docs/announcement.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import Customizer from "$lib/components/docs/theme-customizer/customizer.svelte";

	const title = "Add colors. Make it yours.";
	const description = "Hand-picked themes that you can copy and paste into your apps.";

	let { children } = $props();
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>{title}</PageHeader.Heading>
	<PageHeader.Description>{description}</PageHeader.Description>
	<div class="mt-2 rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
		New Theme Editor coming soon
	</div>
</PageHeader.Root>
<div id="themes" class="border-grid scroll-mt-24 border-b">
	<div class="container-wrapper">
		<div class="container flex items-center py-4">
			<Customizer />
		</div>
	</div>
</div>
<div class="container-wrapper">
	<div class="container py-6">
		<section id="themes" class="scroll-mt-20">
			{@render children()}
		</section>
	</div>
</div>
