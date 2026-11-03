<script lang="ts">
	import Button from "$lib/registry/ui/button/button.svelte";
	import { siteConfig } from "$lib/config.js";
	import GithubIcon from "./github.svelte";
</script>

<Button
	href={siteConfig.links.github}
	target="_blank"
	rel="noreferrer"
	size="sm"
	variant="ghost"
	class="h-8 shadow-none"
	aria-label="Another UI Svelte on GitHub"
>
	<GithubIcon />
</Button>
