<script lang="ts">
	import { page } from "$app/stores";
	import { siteConfig } from "$lib/config/site";

	export let title: string = siteConfig.name;

	$: title = $page.data?.title ? $page.data.title : siteConfig.name;
</script>

<svelte:head>
	{#if title === siteConfig.name}
		<title>
			{title}
		</title>
	{:else}
		<title>
			{title} - {siteConfig.name}
		</title>
	{/if}

	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords} />
	<meta name="author" content="huntabyte" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteConfig.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content="https://shadcn-svelte.com/og.jpg" />
	<meta name="twitter:image:alt" content={siteConfig.name} />
	<meta name="twitter:creator" content="huntabyte" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={siteConfig.url + $page.url.pathname} />
	<meta property="og:image" content="https://shadcn-svelte.com/og.jpg" />
	<meta property="og:image:alt" content={siteConfig.name} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="EN_US" />
</svelte:head>
