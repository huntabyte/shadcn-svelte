<script lang="ts">
	import "../../../static/registry/themes.css";
	import {
		PageHeader,
		PageHeaderDescription,
		PageHeaderHeading
	} from "$components/docs";
	import ThemeCustomizer from "$components/docs/theme-customizer/theme-customizer.svelte";
	import ThemeWrapper from "$components/docs/ThemeWrapper.svelte";
	import CardsNewYork from "@/registry/new-york/example/cards/all.svelte";
	import { onDestroy, onMount } from "svelte";
	import { config } from "@/stores";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { isBrowser } from "@/utils";
</script>

<svelte:head>
	<style>
		@import "../../../static/registry/themes.css";
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
		<PageHeader class="relative pb-4 md:pb-8 lg:pb-12">
			<PageHeaderHeading>Make it yours.</PageHeaderHeading>
			<PageHeaderDescription>
				Hand-picked themes that you can copy and paste into your apps.
			</PageHeaderDescription>
		</PageHeader>
		<div class="px-4 pb-8 md:ml-auto md:pb-0">
			<ThemeCustomizer />
		</div>
	</ThemeWrapper>
	<ThemeWrapper>
		<CardsNewYork />
	</ThemeWrapper>
</div>
