<script lang="ts">
	import WelcomeDialog from "../components/welcome-dialog.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import Metadata from "$lib/components/metadata.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import Customizer from "../components/customizer.svelte";
	import ActionMenu from "../components/action-menu.svelte";

	let { children } = $props();

	const designSystem = useDesignSystem();
</script>

<Metadata
	title="New Project"
	description="Build your own shadcn-svelte."
	ogImage={{
		url: `/create/og${new URL(designSystem.shareUrl).search}`,
		width: "1200",
		height: "630",
	}}
/>

<ActionMenu>
	<div
		data-slot="layout"
		class="group/layout section-soft relative z-10 flex h-svh flex-col overflow-hidden [--customizer-width:--spacing(56)] [--gap:--spacing(4)] md:[--gap:--spacing(6)]"
	>
		<SiteHeader />
		<main
			data-slot="designer"
			class="container-wrapper flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
		>
			{@render children?.()}
			<Customizer />
			<WelcomeDialog />
		</main>
	</div>
</ActionMenu>
