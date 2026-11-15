<script lang="ts">
	import { onMount } from "svelte";
	import Button from "$lib/registry/ui/button/button.svelte";
	import { siteConfig } from "$lib/config.js";
	import { FALLBACK_STAR_COUNT } from "$lib/constants.js";
	import GithubIcon from "./github.svelte";

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
	class="h-8 gap-1.5 rounded-md border-0 px-3 text-sm font-medium text-black shadow-none hover:bg-accent hover:text-accent-foreground active:translate-y-0 has-[>svg]:px-2.5 dark:text-white dark:hover:bg-accent/50 dark:hover:text-accent-foreground"
>
	<GithubIcon class="size-4" />
	<span class="w-fit text-xs text-muted-foreground tabular-nums">
		{stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toLocaleString()}
	</span>
</Button>
