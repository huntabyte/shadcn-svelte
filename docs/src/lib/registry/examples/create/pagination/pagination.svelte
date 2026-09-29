<script lang="ts">
	import PaginationBasic from "./pagination-basic.svelte";
	import PaginationSimple from "./pagination-simple.svelte";
	import PaginationWithSelect from "./pagination-with-select.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<PaginationBasic />
	<PaginationSimple />
	<PaginationWithSelect />
</ExampleWrapper>
