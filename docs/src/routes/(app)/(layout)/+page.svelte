<svelte:options runes />

<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import Metadata from "$lib/components/metadata.svelte";
	import { IconArrowRight } from "@tabler/icons-svelte";
	import CardsDemo from "./cards/cards-demo.svelte";

	const title = "The Foundation for your Design System";
	const description =
		"A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.";

	const mobile = new IsMobile();
</script>

<Metadata {title} {description} />

<div class="flex flex-1 flex-col">
	<PageHeader class="md:**:[.container]:pb-8 lg:**:[.container]:pb-12">
		<Announcement />
		<PageHeaderHeading class="max-w-4xl">{title}</PageHeaderHeading>
		<PageHeaderDescription>{description}</PageHeaderDescription>
		<PageActions>
			<Button href="/create?preset=b27GcrRo" class="h-[31px] rounded-lg">
				Build Your Own <IconArrowRight data-icon="inline-end" />
			</Button>
		</PageActions>
	</PageHeader>
	<div class="container-wrapper flex-1 p-0">
		<div class="container overflow-hidden md:px-0 lg:max-w-none">
			<section class="-mx-4 w-[140vw] overflow-hidden md:hidden">
				<enhanced:img
					class="block dark:hidden"
					src="../../../../static/img/registry/dashboard-01-light.png"
					alt="Dashboard"
					fetchpriority={mobile.current ? "high" : undefined}
					loading={mobile.current ? "eager" : "lazy"}
				/>
				<enhanced:img
					class="hidden dark:block"
					src="../../../../static/img/registry/dashboard-01-dark.png"
					alt="Dashboard"
					fetchpriority="high"
					loading={mobile.current ? "eager" : "lazy"}
				/>
			</section>
			<section class="hidden md:block">
				<div class="style-rhea">
					<CardsDemo />
				</div>
			</section>
		</div>
	</div>
</div>
