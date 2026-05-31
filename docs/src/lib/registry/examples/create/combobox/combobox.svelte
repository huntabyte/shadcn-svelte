<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ComboboxBasic from "./combobox-basic.svelte";
	import ComboboxDisabled from "./combobox-disabled.svelte";
	import ComboboxDisabledItems from "./combobox-disabled-items.svelte";
	import ComboboxInDialog from "./combobox-in-dialog.svelte";
	import ComboboxInPopup from "./combobox-in-popup.svelte";
	import ComboboxInvalid from "./combobox-invalid.svelte";
	import ComboboxLargeList from "./combobox-large-list.svelte";
	import ComboboxMultiple from "./combobox-multiple.svelte";
	import ComboboxMultipleInvalid from "./combobox-multiple-invalid.svelte";
	import ComboboxWithCustomItems from "./combobox-with-custom-items.svelte";
	import ComboboxWithForm from "./combobox-with-form.svelte";
	import ComboboxWithGroups from "./combobox-with-groups.svelte";
	import ComboboxWithGroupsAndSeparator from "./combobox-with-groups-and-separator.svelte";
</script>

<ExampleWrapper>
	<ComboboxBasic />
	<ComboboxDisabled />
	<ComboboxInvalid />
	<ComboboxWithGroups />
	<ComboboxWithGroupsAndSeparator />
	<ComboboxLargeList />
	<ComboboxInPopup />
	<ComboboxWithForm />
	<ComboboxMultiple />
	<ComboboxMultipleInvalid />
	<ComboboxWithCustomItems />
	<ComboboxInDialog />
	<ComboboxDisabledItems />
</ExampleWrapper>
