<script lang="ts">
	import Mail from "./examples/mail/(components)/mail.svelte";
	import { accounts, mails } from "./examples/mail/data.js";
	import { Announcement, ExamplesNav } from "$lib/components/docs/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { Icons } from "$lib/components/docs/icons/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
	import MailLight from "$lib/img/examples/mail-light.png?enhanced";
	import MailDark from "$lib/img/examples/mail-dark.png?enhanced";

	export let data;
</script>

<div class="container relative">
	<PageHeader.Root class="pb-8">
		<Announcement />
		<PageHeader.Heading>Build your component library</PageHeader.Heading>
		<PageHeader.Description class="text-muted-foreground">
			Beautifully designed components that you can copy and paste into your apps. Accessible.
			Customizable. Open Source.
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
		<div class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
			<a href="/docs" class={cn(buttonVariants())}> Get Started </a>
			<a
				target="_blank"
				rel="noreferrer"
				href={siteConfig.links.github}
				class={cn(buttonVariants({ variant: "outline" }))}
			>
				<Icons.gitHub class="mr-2 h-4 w-4" />
				GitHub
			</a>
		</div>
	</PageHeader.Root>
	<ExamplesNav class="[&>a:first-child]:text-primary" />
	<section
		class="bg-background overflow-hidden rounded-lg border shadow-md md:hidden md:shadow-xl"
	>
		<div class="md:hidden">
			<enhanced:img src={MailLight} alt="Mail" class="block dark:hidden" />
			<enhanced:img src={MailDark} alt="Mail" class="hidden dark:block" />
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
