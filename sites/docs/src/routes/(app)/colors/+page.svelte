<script lang="ts">
	import { Announcement, ThemeWrapper } from "$lib/components/docs/index.js";
	import * as PageHeader from "$lib/components/docs/page-header/index.js";
	import ColorCard from "$lib/components/colors/color-card.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
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

<ThemeWrapper defaultTheme="zinc" class="container relative">
	<PageHeader.Root>
		<Announcement />
		<PageHeader.Heading>Tailwind Colors</PageHeader.Heading>
		<PageHeader.Description>
			Tailwind CSS colors in HSL, RGB, and HEX formats.
		</PageHeader.Description>
		<PageHeader.Actions>
			<Button href="#colors" size="sm">Browse Colors</Button>
			<Button href="/docs/theming" variant="ghost" size="sm">Documentation</Button>
		</PageHeader.Actions>
	</PageHeader.Root>
	<div class="ml-4 flex flex-col gap-2">
		<ColorCard />
	</div>
</ThemeWrapper>
