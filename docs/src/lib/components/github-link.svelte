<script lang="ts">
	import { siteConfig } from "$lib/config.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import GithubIcon from "./github.svelte";
	import { FALLBACK_STAR_COUNT } from "$lib/constants.js";
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
		{`${(FALLBACK_STAR_COUNT / 1000).toFixed(1)}k`}
	</span>
</Button>
