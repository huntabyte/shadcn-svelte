<script lang="ts" module>
	import { Context } from "runed";

	export type MetadataContextType = {
		title: string;
		description: string;
		keywords: string[];
		ogImage: { url: string; width: string; height: string };
		siteConfig: { url: string; name: string };
	};

	export const MetadataContext = new Context<MetadataContextType>("MetadataContext");
</script>

<script lang="ts">
	let {
		title,
		description,
		keywords,
		ogImage,
		siteConfig,
		page,
	}: {
		title: string;
		description: string;
		keywords: string[];
		ogImage: { url: string; width: string; height: string };
		siteConfig: { url: string; name: string };
		page: { url: { pathname: string } };
	} = $props();
</script>

<svelte:head>
	<title>{trueTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords?.join(",")} />
	<meta name="author" content="huntabyte" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteConfig.current.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage?.url} />
	<meta name="twitter:image:alt" content={title} />
	<meta name="twitter:creator" content="huntabyte" />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteConfig.current.url + page.url.pathname} />
	<meta property="og:image" content={ogImage?.url} />
	<meta property="og:image:alt" content={title} />
	<meta property="og:image:width" content={ogImage?.width} />
	<meta property="og:image:height" content={ogImage?.height} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={siteConfig.current.name} />
	<meta property="og:locale" content="EN_US" />
</svelte:head>
