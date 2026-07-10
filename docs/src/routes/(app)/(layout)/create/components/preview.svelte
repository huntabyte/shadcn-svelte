<script lang="ts">
	import { browser } from "$app/environment";
	import CtaMobile from "$lib/components/cta-mobile.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { untrack } from "svelte";
	import PreviewSwitcher from "./preview-switcher.svelte";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();

	const designSystem = useDesignSystem();
	let iframe: HTMLIFrameElement;
	let iframeSrc = $derived(
		`/preview/${item}?preset=${encodeURIComponent(untrack(() => designSystem.preset))}`
	);

	function syncDesignSystem() {
		iframe.contentWindow?.postMessage(
			{ type: "design-system-preset", data: designSystem.preset },
			window.location.origin
		);
	}

	$effect(() => {
		if (!browser || !iframe) return;

		syncDesignSystem();
		iframe.addEventListener("load", syncDesignSystem);

		return () => iframe.removeEventListener("load", syncDesignSystem);
	});
</script>

<div data-slot="preview" class="flex min-h-0 flex-1 flex-col gap-(--gap)">
	<div>
		<CtaMobile class="xl:flex" />
	</div>
	<div
		class="ring-foreground/10 md:ring-muted dark:ring-foreground/10 relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl ring"
	>
		<div class="relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden">
			<div class="bg-muted dark:bg-muted/30 absolute inset-0"></div>
			<!--<Button
			href="/preview/{item}{new URL(designSystem.shareUrl).search}&fromPreview=true"
			class="absolute top-2 right-2 isolate z-10"
			variant="ghost"
			size="icon-sm"
		>
			<IconPlaceholder
				lucide="MaximizeIcon"
				tabler="IconBorderCorners"
				hugeicons="ArrowExpandIcon"
				phosphor="CornersOutIcon"
				remixicon="RiExpandDiagonalLine"
			/>
		</Button>-->
			<iframe bind:this={iframe} src={iframeSrc} class="z-10 size-full flex-1" title={item}
			></iframe>
		</div>
		<PreviewSwitcher {item} />
	</div>
</div>
