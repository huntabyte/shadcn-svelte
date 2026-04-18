<script lang="ts">
	import WelcomeDialog from "../components/welcome-dialog.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import Metadata from "$lib/components/metadata.svelte";
	import SiteHeader from "$lib/components/site-header.svelte";
	import Customizer from "../components/customizer.svelte";
	import ActionMenu from "../components/action-menu.svelte";
	import CtaMobile from "$lib/components/cta-mobile.svelte";
	import { OG_IMAGE_BASE_URL } from "../../../../og/og.js";
	import { cn } from "$lib/utils.js";

	let { children } = $props();

	const designSystem = useDesignSystem();
</script>

<Metadata
	title="New Project"
	description="Build your own shadcn-svelte."
	ogImage={{
		url: `${OG_IMAGE_BASE_URL}/create/og${new URL(designSystem.shareUrl).search}`,
		width: "1200",
		height: "630",
	}}
/>

<ActionMenu>
	<InitializeDialog>
		<div
			data-slot="layout"
			class={cn(
				"group/layout section-soft relative z-10 flex h-svh flex-col overflow-hidden",
				"[--customizer-width:--spacing(56)] [--gap:--spacing(4)] md:[--gap:--spacing(6)]",
				"[--preview-height:calc(100svh-var(--header-height)-2rem-150px)] md:[--preview-height:calc(100svh-var(--header-height)-2rem)]"
			)}
		>
			<div class="md:hidden">
				<CtaMobile />
			</div>
			{@render children?.()}
			<Customizer />
			<WelcomeDialog />
		</main>
	</div>
</ActionMenu>
