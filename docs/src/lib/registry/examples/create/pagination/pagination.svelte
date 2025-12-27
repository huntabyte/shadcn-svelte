<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import PaginationBasic from "./pagination-basic.svelte";
	import PaginationSimple from "./pagination-simple.svelte";
	import PaginationWithSelect from "./pagination-with-select.svelte";
</script>

<ExampleWrapper class="w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1">
	<PaginationBasic />
	<PaginationSimple />
	<PaginationWithSelect />
</ExampleWrapper>
