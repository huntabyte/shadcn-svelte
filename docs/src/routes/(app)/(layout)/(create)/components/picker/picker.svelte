<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	type Props =
		| ({
				submenu: true;
		  } & DropdownMenuPrimitive.RootProps)
		| ({
				submenu: false;
		  } & DropdownMenuPrimitive.SubProps);

	let { open = $bindable(false), submenu, ...restProps }: Props = $props();

	// Close picker when focus moves to an iframe (clicks inside iframes don't
	// bubble to the parent document, so the default outside-click handler misses them).
	$effect(() => {
		if (!open) return;

		const onBlur = () => {
			// window.blur fires when focus leaves the document (e.g. into an iframe)
			open = false;
		};

		window.addEventListener("blur", onBlur);
		return () => window.removeEventListener("blur", onBlur);
	});
</script>

{#if submenu}
	<DropdownMenuPrimitive.Sub bind:open {...restProps} />
{:else}
	<DropdownMenuPrimitive.Root bind:open {...restProps} />
{/if}
