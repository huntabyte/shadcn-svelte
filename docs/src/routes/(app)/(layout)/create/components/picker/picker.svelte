<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { usePreviewOverride } from "../preview-override-context.svelte.js";
	import { preservePickerScroll } from "./picker-scroll.js";

	type Props =
		| ({
				submenu: true;
		  } & DropdownMenuPrimitive.RootProps)
		| ({
				submenu: false;
		  } & DropdownMenuPrimitive.SubProps);

	let { open = $bindable(false), submenu, onOpenChange, ...restProps }: Props = $props();
	const previewOverride = usePreviewOverride();

	$effect(() => {
		if (!open) {
			previewOverride.clearOverride();
		}
	});

	function handleOpenChange(nextOpen: boolean) {
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
