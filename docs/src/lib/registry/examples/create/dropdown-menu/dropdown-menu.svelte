<script lang="ts">
	import DropdownMenuBasic from "./dropdown-menu-basic.svelte";
	import DropdownMenuComplex from "./dropdown-menu-complex.svelte";
	import DropdownMenuInDialog from "./dropdown-menu-in-dialog.svelte";
	import DropdownMenuWithAvatar from "./dropdown-menu-with-avatar.svelte";
	import DropdownMenuWithCheckboxesIcons from "./dropdown-menu-with-checkboxes-icons.svelte";
	import DropdownMenuWithCheckboxes from "./dropdown-menu-with-checkboxes.svelte";
	import DropdownMenuWithDestructive from "./dropdown-menu-with-destructive.svelte";
	import DropdownMenuWithIcons from "./dropdown-menu-with-icons.svelte";
	import DropdownMenuWithRadioIcons from "./dropdown-menu-with-radio-icons.svelte";
	import DropdownMenuWithRadio from "./dropdown-menu-with-radio.svelte";
	import DropdownMenuWithShortcuts from "./dropdown-menu-with-shortcuts.svelte";
	import DropdownMenuWithSubmenu from "./dropdown-menu-with-submenu.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<DropdownMenuBasic />
	<DropdownMenuComplex />
	<DropdownMenuWithIcons />
	<DropdownMenuWithShortcuts />
	<DropdownMenuWithSubmenu />
	<DropdownMenuWithCheckboxes />
	<DropdownMenuWithCheckboxesIcons />
	<DropdownMenuWithRadio />
	<DropdownMenuWithRadioIcons />
	<DropdownMenuWithDestructive />
	<DropdownMenuWithAvatar />
	<DropdownMenuInDialog />
</ExampleWrapper>
