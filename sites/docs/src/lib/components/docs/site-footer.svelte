<script lang="ts">
	import { siteConfig } from "$lib/config/site.js";
</script>

<footer class="py-6 md:px-8 md:py-0">
	<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
		<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
			<p class="text-muted-foreground text-center text-sm leading-loose md:text-left">
				Built & designed by
				<a
					href={siteConfig.links.shadTwitter}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					shadcn</a
				>. Ported to Svelte by
				<a
					href={siteConfig.links.twitter}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					huntabyte</a
				>. The source code is available on
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					GitHub</a
				>.
			</p>
		</div>
	</div>
</footer>
