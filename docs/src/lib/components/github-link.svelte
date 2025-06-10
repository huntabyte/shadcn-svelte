<script lang="ts">
	import { siteConfig } from "$lib/config.js";
	import Button from "$lib/registry/ui/button/button.svelte";
	import GithubIcon from "./github.svelte";
	import { FALLBACK_STAR_COUNT } from "$lib/constants.js";
	import { onMount } from "svelte";

	async function getGithubStarCount() {
		try {
			const res = await fetch("https://ungh.cc/repos/huntabyte/shadcn-svelte");
			const data = await res.json();
			return data.repo?.stars ?? FALLBACK_STAR_COUNT;
		} catch (error) {
			console.error(error);
			return FALLBACK_STAR_COUNT;
		}
	}

	let stars = $state(FALLBACK_STAR_COUNT);

	onMount(async () => {
		stars = await getGithubStarCount();
	});
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
