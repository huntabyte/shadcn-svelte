<svelte:options runes />

<script lang="ts">
	import Announcement from "$lib/components/announcement.svelte";
	import PageActions from "$lib/components/page-header/page-actions.svelte";
	import PageHeaderDescription from "$lib/components/page-header/page-header-description.svelte";
	import PageHeaderHeading from "$lib/components/page-header/page-header-heading.svelte";
	import PageHeader from "$lib/components/page-header/page-header.svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import { IconArrowRight } from "@tabler/icons-svelte";
	import CardsDemo from "./cards/cards-demo.svelte";

	const title = "The Foundation for your Design System";
	const description =
		"A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.";
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
				<img src="/images/full-light.png" width="2560" height="2764" alt="Dashboard" class="block h-auto w-full dark:hidden" />
				<img src="/images/full-dark.png" width="2560" height="2764" alt="Dashboard" class="hidden h-auto w-full dark:block" />
			</section>
			<section class="hidden md:block">
				<div class="style-rhea">
					<CardsDemo />
				</div>
			</section>
		</div>
	</div>
</div>
