<script lang="ts">
	import ExamplesNav from "$lib/components/docs/examples-nav/examples-nav.svelte";
	import Announcement from "$lib/components/docs/announcement.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import * as Icon from "$lib/components/docs/icons/index.js";
	import { siteConfig } from "$lib/config/site.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import CardsDemo from "$lib/registry/examples/cards/all.svelte";
</script>

<PageHeader.Root>
	<Announcement />
	<PageHeader.Heading>Build your component library</PageHeader.Heading>
	<PageHeader.Description>
		Beautifully designed components that you can copy and paste into your apps.
	</PageHeader.Description>
	<p class="text-center text-sm text-orange-700 dark:text-orange-400">
		This is an unofficial port of <a
			href={siteConfig.links.shadGithub}
			target="_blank"
			rel="noreferrer"
			class="font-medium underline underline-offset-4">shadcn/ui</a
		>
		to Svelte, and is not affiliated with
		<a
			href={siteConfig.links.shadTwitter}
			target="_blank"
			rel="noreferrer"
			class="font-medium underline underline-offset-4">@shadcn</a
		>.
	</p>
	<PageHeader.Actions>
		<Button href="/docs" size="sm">Get Started</Button>
		<Button href="/blocks" variant="ghost" size="sm">
			<Icon.GitHub class="mr-2 size-4" />
			Browse Blocks
		</Button>
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
				<enhanced:img
					src="$lib/img/examples/cards-light.png"
					alt="cards"
					class="block dark:hidden"
				></enhanced:img>
				<enhanced:img
					src="$lib/img/examples/cards-dark.png"
					alt="cards"
					class="hidden dark:block"
				></enhanced:img>
			</div>
		</section>
		<section class="hidden md:block [&>div]:p-0" style="--radius: 0.75rem;">
			<CardsDemo />
		</section>
	</div>
</div>
