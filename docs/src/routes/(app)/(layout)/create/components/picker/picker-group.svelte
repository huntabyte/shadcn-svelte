<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { children, ...restProps }: DropdownMenuPrimitive.GroupProps = $props();
</script>

<DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...restProps}>
	{@render children?.()}
</DropdownMenuPrimitive.Group>
