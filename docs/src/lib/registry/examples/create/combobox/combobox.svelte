<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ComboboxAutoHighlight from "./combobox-auto-highlight.svelte";
	import ComboboxBasic from "./combobox-basic.svelte";
	import ComboboxClear from "./combobox-clear.svelte";
	import ComboboxDisabled from "./combobox-disabled.svelte";
	import ComboboxInPopup from "./combobox-in-popup.svelte";
	import ComboboxInvalid from "./combobox-invalid.svelte";
	import ComboboxMultiple from "./combobox-multiple.svelte";
	import ComboboxRtl from "./combobox-rtl.svelte";
	import ComboboxWithCustomItems from "./combobox-with-custom-items.svelte";
	import ComboboxWithGroups from "./combobox-with-groups.svelte";
	import ComboboxWithGroupsAndSeparator from "./combobox-with-groups-and-separator.svelte";
</script>

<ExampleWrapper>
	<ComboboxBasic />
	<ComboboxClear />
	<ComboboxDisabled />
	<ComboboxInvalid />
	<ComboboxAutoHighlight />
	<ComboboxWithGroups />
	<ComboboxWithGroupsAndSeparator />
	<ComboboxInPopup />
	<ComboboxMultiple />
	<ComboboxWithCustomItems />
	<ComboboxRtl />
</ExampleWrapper>
