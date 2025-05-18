<script lang="ts">
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import Announcement from "$lib/components/docs/announcement.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import ColorCard from "$lib/components/colors/color-card.svelte";
</script>

<svelte:head>
	<style>
		@import "/themes.css";
	</style>
</svelte:head>

<ThemeWrapper
	defaultTheme="zinc"
	class="relative flex flex-col items-start md:flex-row md:items-center"
>
	<PageHeader.Root class="w-full">
		<Announcement />
		<PageHeader.Heading class="hidden md:block">Tailwind Colors</PageHeader.Heading>
		<PageHeader.Heading class="md:hidden">Tailwind Colors</PageHeader.Heading>
		<PageHeader.Description>
			Tailwind CSS colors in HSL, RGB, HEX, and OKLCH formats.
		</PageHeader.Description>
	</PageHeader.Root>
</ThemeWrapper>

<div class="container-wrapper relative p-6">
	<ColorCard />
</div>
