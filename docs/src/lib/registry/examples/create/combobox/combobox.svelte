<script lang="ts">
	import ComboboxBasic from "./combobox-basic.svelte";
	import ComboboxDisabledItems from "./combobox-disabled-items.svelte";
	import ComboboxDisabled from "./combobox-disabled.svelte";
	import ComboboxInDialog from "./combobox-in-dialog.svelte";
	import ComboboxInPopup from "./combobox-in-popup.svelte";
	import ComboboxInvalid from "./combobox-invalid.svelte";
	import ComboboxLargeList from "./combobox-large-list.svelte";
	import ComboboxMultipleInvalid from "./combobox-multiple-invalid.svelte";
	import ComboboxMultiple from "./combobox-multiple.svelte";
	import ComboboxWithCustomItems from "./combobox-with-custom-items.svelte";
	import ComboboxWithForm from "./combobox-with-form.svelte";
	import ComboboxWithGroupsAndSeparator from "./combobox-with-groups-and-separator.svelte";
	import ComboboxWithGroups from "./combobox-with-groups.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
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
