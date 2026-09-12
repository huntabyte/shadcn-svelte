<script lang="ts">
	import TableBasic from "./table-basic.svelte";
	import TableSimple from "./table-simple.svelte";
	import TableWithActions from "./table-with-actions.svelte";
	import TableWithBadges from "./table-with-badges.svelte";
	import TableWithFooter from "./table-with-footer.svelte";
	import TableWithInput from "./table-with-input.svelte";
	import TableWithSelect from "./table-with-select.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<TableBasic />
	<TableWithFooter />
	<TableSimple />
	<TableWithBadges />
	<TableWithActions />
	<TableWithSelect />
	<TableWithInput />
</ExampleWrapper>
