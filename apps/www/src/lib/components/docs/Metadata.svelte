<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { page } from "$app/stores";
	import { siteConfig } from "$lib/config/site";

	export let title: string = siteConfig.name;

	// $: if ($page.data.metadata.title) {
	// 	title = $page.data.metadata.title;
	// }
	$: title = $page.data?.title ? $page.data.title : siteConfig.name;
</script>

<MetaTags
	title={siteConfig.name}
	titleTemplate={title === siteConfig.name
		? title
		: `${title} - ${siteConfig.name}`}
	description={siteConfig.description}
	openGraph={{
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name
			}
		],
		site_name: siteConfig.name
	}}
	twitter={{
		handle: "@huntabyte",
		site: "@site",
		cardType: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		image: siteConfig.ogImage,
		imageAlt: siteConfig.name
	}}
/>
