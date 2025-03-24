<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let restProps: DropdownMenuPrimitive.RadioGroupProps = $props();
</script>

<DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...restProps}/>
