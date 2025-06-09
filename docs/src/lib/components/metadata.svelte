<script lang="ts">
	import { page } from "$app/state";
	import { siteConfig } from "$lib/config.js";

	let {
		title,
		ogImage,
		description,
		keywords = siteConfig.keywords,
		ogType = "website",
	}: {
		title?: string;
		ogImage?: Partial<(typeof siteConfig)["ogImage"]>;
		description?: string;
		keywords?: string[];
		ogType?: string;
	} = $props();

	const ogUrl = $derived.by(() => {
		if (!ogImage?.url) return siteConfig.ogImage.url;
		if (ogImage.url.startsWith("/")) return siteConfig.url + ogImage.url;
		return ogImage.url;
	});

	const ogWidth = $derived.by(() => {
		if (ogImage?.width) return ogImage.width;
		return siteConfig.ogImage.width;
	});

	const ogHeight = $derived.by(() => {
		if (ogImage?.height) return ogImage.height;
		return siteConfig.ogImage.height;
	});

	const trueTitle = $derived(
		title === siteConfig.name ? siteConfig.name : `${title} - ${siteConfig.name}`
	);
</script>

<svelte:head>
	<title>{trueTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords?.join(",")} />
	<meta name="author" content="huntabyte" />
	<meta name="creator" content="huntabyte" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteConfig.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogUrl} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content="@huntabyte" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={siteConfig.url + page.url.pathname} />
	<meta property="og:image" content={ogUrl} />
	<meta property="og:image:alt" content={title} />
	<meta property="og:image:width" content={ogWidth} />
	<meta property="og:image:height" content={ogHeight} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="EN_US" />
</svelte:head>
