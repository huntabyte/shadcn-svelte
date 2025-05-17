<script lang="ts">
	import * as Icon from "../icons/index.js";
	import { page } from "$app/state";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-4 flex items-center gap-2 lg:mr-6">
		<Icon.Logo class="h-6 w-6" />
		<span class="hidden font-bold lg:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-4 text-sm xl:gap-6">
		<a
			href="/docs/installation"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname === "/docs/installation"
					? "text-foreground"
					: "text-foreground/80"
			)}
		>
			Docs
		</a>
		<a
			href="/docs/components"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname?.startsWith("/docs/components/") &&
					!page.url.pathname?.startsWith("/docs/component/chart")
					? "text-foreground"
					: "text-foreground/80"
			)}
		>
			Components
		</a>
		<a
			href="/blocks"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname?.startsWith("/blocks") ? "text-foreground" : "text-foreground/80"
			)}
		>
			Blocks
		</a>
		<a
			href="/charts"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname?.startsWith("/docs/component/chart") ||
					page.url.pathname?.startsWith("/charts")
					? "text-foreground"
					: "text-foreground/80"
			)}
		>
			Charts
		</a>
		<a
			href="/themes"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname?.startsWith("/themes") ? "text-foreground" : "text-foreground/80"
			)}
		>
			Themes
		</a>
		<a
			href="/colors"
			class={cn(
				"hover:text-foreground/80 transition-colors",
				page.url.pathname?.startsWith("/colors") ? "text-foreground" : "text-foreground/80"
			)}
		>
			Colors
		</a>
	</nav>
</div>
