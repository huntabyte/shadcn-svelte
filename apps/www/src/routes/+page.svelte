<script lang="ts">
	import { ArrowRight } from "radix-icons-svelte";
	import { DashboardPage, ExamplesNav } from "@/components/docs";
	import * as PageHeader from "@/components/docs/page-header";
	import { Icons } from "@/components/docs/icons";
	import { buttonVariants } from "@/registry/new-york/ui/button";
	import { siteConfig } from "$lib/config/site";
	import { cn } from "@/utils";
	import Separator from "@/registry/new-york/ui/separator/separator.svelte";
</script>

<div class="container relative">
	<PageHeader.Root class="pb-8">
		<a
			href="/docs/installation#vscode-extension"
			class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-muted"
		>
		✨ <Separator class="h-4 mx-2" orientation="vertical" />
			<span> VSCode extension </span>
			<ArrowRight class="w-4 h-4 ml-1" />
		</a>
		<PageHeader.Heading>Build your component library.</PageHeader.Heading>
		<PageHeader.Description>
			Beautifully designed components that you can copy and paste into
			your apps. Accessible. Customizable. Open Source.
		</PageHeader.Description>
		<p class="text-sm text-orange-700 dark:text-orange-400">
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
			>, just inspired by him.
		</p>
		<div class="flex items-center w-full pt-4 pb-8 space-x-4 md:pb-10">
			<a href="/docs" class={cn(buttonVariants())}> Get Started </a>
			<a
				target="_blank"
				rel="noreferrer"
				href={siteConfig.links.github}
				class={cn(buttonVariants({ variant: "outline" }))}
			>
				<Icons.gitHub class="w-4 h-4 mr-2" />
				GitHub
			</a>
		</div>
	</PageHeader.Root>
	<ExamplesNav class="[&>a:first-child]:text-primary" />
	<section
		class="space-y-8 overflow-hidden border-2 rounded-lg border-primary dark:border-muted md:hidden"
	>
		<img
			src="/examples/dashboard-light.png"
			width={1280}
			height={866}
			alt="Dashboard"
			class="block dark:hidden"
		/>
		<img
			src="/examples/dashboard-dark.png"
			width={1280}
			height={866}
			alt="Dashboard"
			class="hidden dark:block"
		/>
	</section>
	<section class="hidden md:block">
		<div class="overflow-hidden border rounded-lg shadow-xl bg-background">
			<DashboardPage />
		</div>
	</section>
</div>
