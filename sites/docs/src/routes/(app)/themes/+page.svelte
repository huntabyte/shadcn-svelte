<script lang="ts">
	import ThemeCustomizer from "$lib/components/docs/theme-customizer/theme-customizer.svelte";
	import Announcement from "$lib/components/docs/announcement.svelte";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import { CardsDefault } from "$lib/registry/examples/cards/index.js";
</script>

<svelte:head>
	<style>
		@import "/themes.css";
		:root {
			--vis-color0: var(--primary);
			--vis-color1: #ffffff;
			--vis-color2: #ffffff;
			--vis-color3: #ffffff;
			--vis-color4: #ffffff;
		}
	</style>
</svelte:head>

<ThemeWrapper
	defaultTheme="zinc"
	class="relative flex flex-col items-start md:flex-row md:items-center"
>
	<PageHeader.Root class="w-full">
		<Announcement />
		<PageHeader.Heading class="hidden md:block">Add colors. Make it yours.</PageHeader.Heading>
		<PageHeader.Heading class="md:hidden">Make it yours.</PageHeader.Heading>
		<PageHeader.Description>
			Hand-picked themes that you can copy and paste into your apps.
		</PageHeader.Description>
		<PageHeader.Actions>
			<ThemeCustomizer />
		</PageHeader.Actions>
	</PageHeader.Root>
</ThemeWrapper>

<div class="container-wrapper relative p-6">
	<ThemeWrapper>
		<CardsDefault />
	</ThemeWrapper>
</div>
