<script lang="ts">
	import { ExamplesNav, Announcement } from "@/components/docs";
	import * as PageHeader from "@/components/docs/page-header";
	import { Icons } from "@/components/docs/icons";
	import { buttonVariants } from "@/registry/new-york/ui/button";
	import { siteConfig } from "$lib/config/site";
	import { cn } from "@/utils";
	import Mail from "./examples/mail/mail.svelte";
	import { accounts, mails } from "./examples/mail/data";

	export let data;

	const defaultLayout = data.layout ? data.layout : undefined;
	const defaultCollapsed = data.collapsed ? data.collapsed : false;
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
		class="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl"
	>
		<img
			src="/examples/mail-light.png"
			width={1280}
			height={727}
			alt="Dashboard"
			class="block dark:hidden"
		/>
		<img
			src="/examples/mail-dark.png"
			width={1280}
			height={727}
			alt="Dashboard"
			class="hidden dark:block"
		/>
	</section>
	<section class="hidden md:block">
		<div class="overflow-hidden rounded-lg border bg-background shadow-lg">
			<Mail {accounts} {mails} {defaultLayout} {defaultCollapsed} navCollapsedSize={4} />
		</div>
	</section>
</div>
