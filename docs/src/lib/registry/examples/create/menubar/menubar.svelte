<script lang="ts">
	import MenubarBasic from "./menubar-basic.svelte";
	import MenubarDestructive from "./menubar-destructive.svelte";
	import MenubarFormat from "./menubar-format.svelte";
	import MenubarInDialog from "./menubar-in-dialog.svelte";
	import MenubarInsert from "./menubar-insert.svelte";
	import MenubarWithCheckboxes from "./menubar-with-checkboxes.svelte";
	import MenubarWithIcons from "./menubar-with-icons.svelte";
	import MenubarWithInset from "./menubar-with-inset.svelte";
	import MenubarWithRadio from "./menubar-with-radio.svelte";
	import MenubarWithShortcuts from "./menubar-with-shortcuts.svelte";
	import MenubarWithSubmenu from "./menubar-with-submenu.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<MenubarBasic />
	<MenubarWithSubmenu />
	<MenubarWithCheckboxes />
	<MenubarWithRadio />
	<MenubarWithIcons />
	<MenubarWithShortcuts />
	<MenubarFormat />
	<MenubarInsert />
	<MenubarDestructive />
	<MenubarInDialog />
	<MenubarWithInset />
</ExampleWrapper>
