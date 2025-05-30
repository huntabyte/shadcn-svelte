<script lang="ts">
	import { siteConfig } from "$lib/config";
	import Button from "$lib/registry/ui/button/button.svelte";
	import GithubIcon from "./github.svelte";
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
	<!-- <StarsCount /> -->
</Button>
