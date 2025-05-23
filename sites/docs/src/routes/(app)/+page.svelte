<script lang="ts">
	import ExamplesNav from "$lib/components/docs/examples-nav/examples-nav.svelte";
	import Announcement from "$lib/components/docs/announcement.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import CardsDemo from "$lib/components/docs/cards/demo.svelte";
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>Build your component library</PageHeader.Heading>
	<PageHeader.Description>
		A set of beautifully-designed, accessible components and a code distribution platform. Open
		Source. Open Code.
	</PageHeader.Description>
	<PageHeader.Actions>
		<Button href="/docs" size="sm">Get Started</Button>
		<Button href="/blocks" variant="ghost" size="sm" class="rounded-md">Browse Blocks</Button>
	</PageHeader.Actions>
</PageHeader.Root>
<div class="border-grid border-b">
	<div class="container-wrapper">
		<div class="container py-4">
			<ExamplesNav class="[&>a:first-child]:text-primary" />
		</div>
	</div>
</div>
<div class="container-wrapper">
	<div class="container py-6">
		<section
			class="bg-background overflow-hidden rounded-lg border shadow-md md:hidden md:shadow-xl"
		>
			<div class="md:hidden">
				<img src="/img/examples/cards-light.png" alt="cards" class="block dark:hidden" />
				<img src="/img/examples/cards-dark.png" alt="cards" class="hidden dark:block" />
			</div>
		</section>
		<section class="hidden md:block [&>div]:p-0" style="--radius: 0.75rem;">
			<CardsDemo />
		</section>
	</div>
</div>
