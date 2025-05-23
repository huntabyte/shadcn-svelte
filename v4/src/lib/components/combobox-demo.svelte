<script lang="ts">
	import ComboboxWithCheckbox from "./combobox-with-checkbox.svelte";
	import FrameworkCombobox from "./framework-combobox.svelte";
	import UserCombobox from "./user-combobox.svelte";
	import TimezoneCombobox from "./timezone-combobox.svelte";
</script>

<div class="flex w-full flex-wrap items-start gap-4">
	<FrameworkCombobox />
	<UserCombobox />
	<TimezoneCombobox />
	<ComboboxWithCheckbox />
</div>
