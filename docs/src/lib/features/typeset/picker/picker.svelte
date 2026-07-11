<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	type Props =
		| ({
				submenu: true;
		  } & DropdownMenuPrimitive.SubProps)
		| ({
				submenu: false;
		  } & DropdownMenuPrimitive.RootProps);

	let { open = $bindable(false), submenu, ...restProps }: Props = $props();
</script>

{#if submenu}
	<DropdownMenuPrimitive.Sub bind:open {...restProps} />
{:else}
	<DropdownMenuPrimitive.Root bind:open {...restProps} />
{/if}
