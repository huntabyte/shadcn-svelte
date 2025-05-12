<script lang="ts">
	import { siteConfig } from "$lib/config/site.js";
</script>

<footer class="border-grid border-t py-6 md:py-0">
	<div class="container-wrapper">
		<div class="container py-4">
			<div
				class="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left"
			>
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
			</div>
		</div>
	</div>
</footer>
