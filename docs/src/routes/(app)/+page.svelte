<script>
	import Announcement from "$lib/components/announcement.svelte";
	import ExamplesNav from "$lib/components/examples-nav.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import PageNav from "$lib/components/page-nav.svelte";
	import ThemeSelector from "$lib/components/theme-selector.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import CardsDemo from "$lib/components/cards/demo.svelte";
	import Metadata from "$lib/components/metadata.svelte";

	const title = "Build your Component Library";
	const description =
		"A set of beautifully-designed, accessible components and a code distribution platform. Open Source. Open Code.";
</script>

<Metadata {title} {description} />

<div class="flex flex-1 flex-col">
	<PageHeader>
		<Announcement />
		<PageHeaderHeading>{title}</PageHeaderHeading>
		<PageHeaderDescription>{description}</PageHeaderDescription>
		<PageActions>
			<Button href="/docs/installation" size="sm">Get Started</Button>
			<Button href="/blocks" size="sm" variant="ghost">Browse Blocks</Button>
		</PageActions>
	</PageHeader>
	<PageNav class="hidden md:flex">
		<ExamplesNav class="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
		<ThemeSelector class="mr-4 hidden md:flex" />
	</PageNav>
	<div class="container-wrapper section-soft flex-1 pb-6">
		<div class="container overflow-hidden">
			<section
				class="border-border/50 -mx-4 w-[160vw] overflow-hidden rounded-lg border md:hidden md:w-[150vw]"
			>
				<img
					src="/img/registry/dashboard-01-light.png"
					width={1400}
					height={875}
					alt="Dashboard"
					class="block dark:hidden"
				/>
				<img
					src="/img/registry/dashboard-01-dark.png"
					width={1400}
					height={875}
					alt="Dashboard"
					class="hidden dark:block"
				/>
			</section>
			<section class="theme-container hidden md:block">
				<CardsDemo />
			</section>
		</div>
	</div>
</div>
