<script lang="ts">
	import { browser } from "$app/environment";
	import { decodePreset, encodePreset, DEFAULT_PRESET_CONFIG } from "shadcn-svelte/preset";
	import { untrack } from "svelte";
	import CtaMobile from "$lib/components/cta-mobile.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import PreviewSwitcher from "./preview-switcher.svelte";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();
	const designSystem = useDesignSystem();
	const previewOverride = usePreviewOverride();
	let iframe = $state<HTMLIFrameElement>();

	const iframeSrc = $derived(
		`/preview/${item}?preset=${encodeURIComponent(untrack(() => designSystem.preset))}`
	);
	const previewPreset = $derived.by(() => {
		if (!previewOverride.override) return designSystem.preset;

		const committed = decodePreset(designSystem.preset) ?? DEFAULT_PRESET_CONFIG;
		return encodePreset({ ...committed, ...previewOverride.override });
	});

	function syncPreview() {
		iframe?.contentWindow?.postMessage(
			{ type: "design-system-preset", data: previewPreset },
			window.location.origin
		);
	}

	$effect(() => {
		if (!browser || !iframe) return;

		const frame = iframe;
		syncPreview();
		const handleReady = (event: MessageEvent) => {
			if (
				event.origin === window.location.origin &&
				event.source === frame.contentWindow &&
				event.data?.type === "design-system-ready"
			)
				syncPreview();
		};
		frame.addEventListener("load", syncPreview);
		window.addEventListener("message", handleReady);
		return () => {
			frame.removeEventListener("load", syncPreview);
			window.removeEventListener("message", handleReady);
		};
	});
</script>

<div data-slot="preview" class="flex min-h-0 flex-1 flex-col gap-(--gap)">
	<div>
		<CtaMobile class="xl:flex" />
	</div>
	<div
		class="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10"
	>
		<div class="relative z-0 mx-auto flex w-full flex-1 flex-col overflow-hidden">
			<div class="absolute inset-0 bg-muted dark:bg-muted/30"></div>
			{#key item}
				<!-- A new browsing context avoids adding iframe entries to browser history. -->
				<iframe bind:this={iframe} src={iframeSrc} class="z-10 size-full flex-1" title={item}
				></iframe>
			{/key}
		</div>
		<PreviewSwitcher {item} />
	</div>
</div>
