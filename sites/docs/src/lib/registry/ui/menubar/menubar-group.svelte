<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		inset = undefined,
		...restProps
	}: MenubarPrimitive.GroupProps & {
		inset?: boolean;
	} = $props();
</script>

<MenubarPrimitive.Group bind:ref data-slot="menubar-group" {...restProps} />
