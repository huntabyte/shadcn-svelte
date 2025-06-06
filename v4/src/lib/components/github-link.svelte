<script lang="ts">
	import { siteConfig } from "$lib/config.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import GithubIcon from "./github.svelte";
	import { page } from "$app/state";
	import { FALLBACK_STAR_COUNT } from "$lib/constants.js";

	const stars = $derived(page.data?.stars ?? FALLBACK_STAR_COUNT);
</script>

<Button
	href={siteConfig.links.github}
	target="_blank"
	rel="noreferrer"
	size="sm"
	variant="ghost"
	class="h-8 shadow-none"
>
	<GithubIcon />
	<span class="text-muted-foreground w-8 text-xs tabular-nums">
		{stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
	</span>
</Button>
