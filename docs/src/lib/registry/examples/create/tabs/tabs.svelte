<script lang="ts">
	import TabsBasic from "./tabs-basic.svelte";
	import TabsDisabled from "./tabs-disabled.svelte";
	import TabsIconOnly from "./tabs-icon-only.svelte";
	import TabsLineDisabled from "./tabs-line-disabled.svelte";
	import TabsLineWithContent from "./tabs-line-with-content.svelte";
	import TabsLine from "./tabs-line.svelte";
	import TabsMultiple from "./tabs-multiple.svelte";
	import TabsVariantsComparison from "./tabs-variants-comparison.svelte";
	import TabsVertical from "./tabs-vertical.svelte";
	import TabsWithContent from "./tabs-with-content.svelte";
	import TabsWithDropdown from "./tabs-with-dropdown.svelte";
	import TabsWithIcons from "./tabs-with-icons.svelte";
	import TabsWithInputAndButton from "./tabs-with-input-and-button.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<TabsBasic />
	<TabsLine />
	<TabsVariantsComparison />
	<TabsDisabled />
	<TabsWithIcons />
	<TabsIconOnly />
	<TabsMultiple />
	<TabsWithContent />
	<TabsLineWithContent />
	<TabsLineDisabled />
	<TabsWithDropdown />
	<TabsVertical />
	<TabsWithInputAndButton />
</ExampleWrapper>
