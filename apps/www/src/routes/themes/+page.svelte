<script lang="ts">
	import { ThemeCustomizer, ThemeWrapper } from "@/components/docs";
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
		<PageHeader.Root class="relative pb-4 md:pb-8 lg:pb-12">
			<PageHeader.Heading>Make it yours.</PageHeader.Heading>
			<PageHeader.Description>
				Hand-picked themes that you can copy and paste into your apps.
			</PageHeader.Description>
		</PageHeader.Root>
		<div class="px-4 pb-8 md:ml-auto md:pb-0">
			<ThemeCustomizer />
		</div>
	</ThemeWrapper>
	<ThemeWrapper>
		{#if $config.style === "default"}
			<CardsDefault />
		{:else}
			<CardsNewYork />
		{/if}
	</ThemeWrapper>
</div>
