<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof DrawerPrimitive.Trigger> = $props();
</script>

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" {...restProps} />
