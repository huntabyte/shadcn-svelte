<script lang="ts">
	import * as Icon from "$lib/components/docs/icons/index.js";
	import ModeToggle from "$lib/components/docs/mode-toggle.svelte";
	import CommandMenu from "$lib/components/docs/command-menu.svelte";
	import MainNav from "$lib/components/docs/nav/main-nav.svelte";
	import MobileNav from "$lib/components/docs/nav/mobile-nav.svelte";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
</script>

<header
	class="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<MobileNav />
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<div class="w-full flex-1 md:w-auto md:flex-none">
				<CommandMenu />
			</div>
			<nav class="flex items-center">
				<a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost",
							}),
							"h-8 w-8 px-0"
						)}
					>
						<Icon.GitHub class="size-4" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
				<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost",
							}),
							"h-8 w-8 px-0"
						)}
					>
						<Icon.Twitter class="size-3 fill-current" />
						<span class="sr-only">X (formerly known as Twitter)</span>
					</div>
				</a>
				<ModeToggle />
			</nav>
		</div>
	</div>
</header>
