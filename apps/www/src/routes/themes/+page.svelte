<script lang="ts">
	import {
		ThemeCustomizer,
		ThemeWrapper,
		Announcement
	} from "@/components/docs";
	import * as PageHeader from "@/components/docs/page-header";
	import { CardsNewYork } from "@/registry/new-york/example/cards";
	import { CardsDefault } from "@/registry/default/example/cards";
	import { config } from "@/stores";
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
			<PageHeader.Heading class="hidden md:block">
				Add colors. Make it yours.
			</PageHeader.Heading>
			<PageHeader.Heading class="md:hidden">
				Make it yours.
			</PageHeader.Heading>
			<PageHeader.Description balancer={false}>
				Hand-picked themes that you can copy and paste into your apps.
			</PageHeader.Description>
			<div
				class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10"
			>
				<ThemeCustomizer />
			</div>
		</PageHeader.Root>
	</ThemeWrapper>
	<ThemeWrapper>
		{#if $config.style === "default"}
			<CardsDefault />
		{:else}
			<CardsNewYork />
		{/if}
	</ThemeWrapper>
</div>
