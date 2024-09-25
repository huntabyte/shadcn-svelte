<script lang="ts">
	import { Announcement, ThemeWrapper } from "$lib/components/docs/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import ColorCard from "$lib/components/colors/color-card.svelte";
</script>

<svelte:head>
	<style>
		@import "/registry/themes.css";
		:root {
			--vis-color0: var(--primary);
			--vis-color1: #ffffff;
			--vis-color2: #ffffff;
			--vis-color3: #ffffff;
			--vis-color4: #ffffff;
		}
	</style>
</svelte:head>

<div class="container">
	<ThemeWrapper
		defaultTheme="zinc"
		class="relative flex flex-col items-start md:flex-row md:items-center"
	>
		<PageHeader.Root>
			<Announcement />
			<PageHeader.Heading class="hidden md:block">Tailwind Colors</PageHeader.Heading>
			<PageHeader.Heading class="md:hidden">Tailwind Colors</PageHeader.Heading>
			<PageHeader.Description balanced={false}>
				Tailwind CSS colors in HSL, RGB, and HEX formats.
			</PageHeader.Description>
		</PageHeader.Root>
	</ThemeWrapper>

	<div class="flex flex-col gap-2">
		<ColorCard />
	</div>
</div>
