<script lang="ts">
	import { siteConfig } from "$lib/config/site";
	import { Icons } from "./icons";
</script>

<footer class="border-t py-6 md:py-0">
	<div
		class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row"
	>
		<div
			class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0"
		>
			<Icons.logo class="hidden h-6 w-6 md:inline-block" />
			<p
				class="text-center text-sm leading-loose text-muted-foreground md:text-left"
			>
				Built & designed by{" "}
				<a
					href={siteConfig.links.shadTwitter}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					shadcn
				</a>
				. Ported to Svelte by{" "}
				<a
					href={siteConfig.links.twitter}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					huntabyte
				</a>
				. The source code is available on{" "}
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					GitHub
				</a>
				.
			</p>
		</div>
	</div>
</footer>
