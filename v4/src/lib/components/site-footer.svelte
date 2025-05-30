<script>
	import { siteConfig } from "$lib/config";
</script>

<footer class="group-has-[.section-soft]/body:bg-surface/40 dark:bg-transparent">
	<div class="container-wrapper px-4 xl:px-6">
		<div class="h-(--footer-height) flex items-center justify-between">
			<div class="text-muted-foreground w-full text-center text-xs leading-loose sm:text-sm">
				Built by
				<a
					href="https://x.com/shadcn"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					shadcn
				</a>
				. Ported to svelte by
				<a
					href="https://x.com/huntabyte"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4">Huntabyte</a
				>
				The source code is available on
				<a
					href={siteConfig.links.github}
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4"
				>
					GitHub
				</a>
				.
			</div>
		</div>
	</div>
</footer>
