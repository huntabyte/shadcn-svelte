<script lang="ts">
	import { Icons, LightSwitch, MainNav, MobileNav } from "$components/docs";
	import { buttonVariants } from "@/registry/default/ui/button";
	import { siteConfig } from "$lib/config/site";
	import { cn } from "$lib/utils";
</script>

<header
	class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<MainNav />
		<MobileNav />
		<div
			class="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end"
		>
			<div class="w-full flex-1 md:w-auto md:flex-none">
				<!-- Command Menu Here -->
			</div>
			<nav class="flex items-center space-x-1">
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noreferrer"
				>
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
						<Icons.gitHub class="h-5 w-5" />
						<span class="sr-only">GitHub</span>
					</div>
				</a>
				<a
					href={siteConfig.links.shadTwitter}
					target="_blank"
					rel="noreferrer"
				>
					<div
						class={cn(
							buttonVariants({
								size: "sm",
								variant: "ghost"
							}),
							"w-9 px-0"
						)}
					>
						<Icons.twitter class="h-5 w-5 fill-current" />
						<span class="sr-only">Twitter</span>
					</div>
				</a>
				<LightSwitch />
			</nav>
		</div>
	</div>
</header>
