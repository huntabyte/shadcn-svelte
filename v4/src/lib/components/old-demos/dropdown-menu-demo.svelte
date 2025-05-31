<script lang="ts">
	import DropdownMenuAvatarOnly from "./dropdown-menu-avatar-only.svelte";
	import DropdownMenuCheckboxes from "./dropdown-menu-checkboxes.svelte";
	import DropdownMenuIconColor from "./dropdown-menu-icon-color.svelte";
	import DropdownMenuRadioGroup from "./dropdown-menu-radio-group.svelte";
	import DropdownMenuSimple from "./dropdown-menu-simple.svelte";
	import DropdownMenuWithAvatar from "./dropdown-menu-with-avatar.svelte";
</script>

<div class="flex flex-wrap items-start gap-4">
	<DropdownMenuSimple />
	<DropdownMenuCheckboxes />
	<DropdownMenuRadioGroup />
	<DropdownMenuWithAvatar />
	<DropdownMenuAvatarOnly />
	<DropdownMenuIconColor />
</div>
