<script lang="ts">
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Announcement } from "$lib/components/docs/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
</script>

<div class="container relative">
	<PageHeader.Root>
		<Announcement />
		<PageHeader.Heading>Beautiful Charts</PageHeader.Heading>
		<PageHeader.Description>
			Built using LayerChart. Copy and paste into your apps. Open Source.
		</PageHeader.Description>
		<PageHeader.Actions>
			<Button href="#charts" size="sm">Browse Charts</Button>
			<Button href="/docs/components/chart" variant="ghost" size="sm">Documentation</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<section id="charts" class="scroll-mt-20">
		<slot></slot>
	</section>
</div>
