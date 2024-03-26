<script lang="ts">
	import { Announcement } from "$lib/components/docs/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
</script>

<div class="container relative">
	<PageHeader.Root class="max-w-3xl">
		<Announcement />
		<PageHeader.Heading class="text-balance">Building Blocks for the Web</PageHeader.Heading>
		<PageHeader.Description>
			Beautifully designed. Copy and paste into your apps. Open source.
		</PageHeader.Description>
		<PageHeader.Actions>
			<Button href="#blocks">Browse</Button>
			<Button
				href="https://github.com/shadcn-ui/ui/discussions/new?category=blocks-request"
				target="_blank"
				variant="outline"
			>
				Request a block
			</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<section id="blocks" class="grid scroll-mt-24 gap-24 lg:gap-48">
		<slot />
	</section>
</div>
