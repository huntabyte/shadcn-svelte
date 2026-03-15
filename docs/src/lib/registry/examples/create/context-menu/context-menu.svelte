<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ContextMenuBasic from "./context-menu-basic.svelte";
	import ContextMenuWithSides from "./context-menu-with-sides.svelte";
	import ContextMenuWithIcons from "./context-menu-with-icons.svelte";
	import ContextMenuWithShortcuts from "./context-menu-with-shortcuts.svelte";
	import ContextMenuWithSubmenu from "./context-menu-with-submenu.svelte";
	import ContextMenuWithGroups from "./context-menu-with-groups.svelte";
	import ContextMenuWithCheckboxes from "./context-menu-with-checkboxes.svelte";
	import ContextMenuWithRadio from "./context-menu-with-radio.svelte";
	import ContextMenuWithDestructive from "./context-menu-with-destructive.svelte";
	import ContextMenuInDialog from "./context-menu-in-dialog.svelte";
</script>

<ExampleWrapper>
	<ContextMenuBasic />
	<ContextMenuWithSides />
	<ContextMenuWithIcons />
	<ContextMenuWithShortcuts />
	<ContextMenuWithSubmenu />
	<ContextMenuWithGroups />
	<ContextMenuWithCheckboxes />
	<ContextMenuWithRadio />
	<ContextMenuWithDestructive />
	<ContextMenuInDialog />
</ExampleWrapper>
