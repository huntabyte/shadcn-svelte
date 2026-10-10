<script module lang="ts">
	let activeMobilePicker: { close: () => void } | null = null;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { onDestroy } from "svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { preservePickerScroll } from "./picker-scroll.js";
	import { usePreviewOverride } from "../preview-override-context.svelte.js";

	type Props =
		| ({
				submenu: true;
		  } & DropdownMenuPrimitive.RootProps)
		| ({
				submenu: false;
		  } & DropdownMenuPrimitive.SubProps);

	let { open = $bindable(false), submenu, onOpenChange, ...restProps }: Props = $props();
	const previewOverride = usePreviewOverride();
	const isMobile = new IsMobile();
	const picker = { close: () => (open = false) };

	onDestroy(() => {
		if (activeMobilePicker === picker) activeMobilePicker = null;
	});

	$effect(() => {
		if (!open) {
			previewOverride.clearOverride();
			if (activeMobilePicker === picker) activeMobilePicker = null;
		}
	});

	function handleOpenChange(nextOpen: boolean) {
		if (nextOpen && !submenu && isMobile.current) {
			if (activeMobilePicker !== picker) activeMobilePicker?.close();
			activeMobilePicker = picker;
		} else if (!nextOpen && activeMobilePicker === picker) {
			activeMobilePicker = null;
		}

		if (!nextOpen) {
			preservePickerScroll();
			previewOverride.clearOverride();
		}

		onOpenChange?.(nextOpen);
	}

	// Close picker when focus moves to an iframe (clicks inside iframes don't
	// bubble to the parent document, so the default outside-click handler misses them).
	$effect(() => {
		if (!open) return;

		const onBlur = () => {
			// window.blur fires when focus leaves the document (e.g. into an iframe)
			previewOverride.clearOverride();
			open = false;
		};

		window.addEventListener("blur", onBlur);
		return () => window.removeEventListener("blur", onBlur);
	});
</script>

{#if submenu}
	<DropdownMenuPrimitive.Sub bind:open onOpenChange={handleOpenChange} {...restProps} />
{:else}
	<DropdownMenuPrimitive.Root bind:open onOpenChange={handleOpenChange} {...restProps} />
{/if}
