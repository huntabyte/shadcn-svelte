<script lang="ts">
	import Mail from "./examples/mail/(components)/mail.svelte";
	import { accounts, mails } from "./examples/mail/data.js";
	import ExamplesNav from "$lib/components/docs/examples-nav/examples-nav.svelte";
	import Announcement from "$lib/components/docs/announcement.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import * as Icon from "$lib/components/docs/icons/index.js";
	import { siteConfig } from "$lib/config/site.js";
	import Button from "$lib/registry/new-york/ui/button/button.svelte";

	let { data } = $props();
</script>

<div class="container relative">
	<PageHeader.Root class="pb-8">
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
			<Button
				target="_blank"
				rel="noreferrer"
				href={siteConfig.links.github}
				variant="ghost"
				size="sm"
			>
				<Icon.GitHub class="mr-2 size-4" />
				GitHub
			</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<ExamplesNav class="[&>a:first-child]:text-primary" />
	<section
		class="bg-background overflow-hidden rounded-lg border shadow-md md:hidden md:shadow-xl"
	>
		<div class="md:hidden">
			<enhanced:img
				src="$lib/img/examples/mail-light.png"
				alt="Mail"
				class="block dark:hidden"
			></enhanced:img>
			<enhanced:img src="$lib/img/examples/mail-dark.png" alt="Mail" class="hidden dark:block"
			></enhanced:img>
		</div>
	</section>
	<section class="hidden md:block">
		<div class="bg-background overflow-hidden rounded-lg border shadow-lg">
			<Mail
				{accounts}
				{mails}
				defaultLayout={data.layout}
				defaultCollapsed={data.collapsed}
				navCollapsedSize={4}
			/>
		</div>
	</section>
</div>
