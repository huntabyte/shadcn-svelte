<script lang="ts">
	import type { PageData } from "./$types";
	import DataTable from "./data-table.svelte";

	export let data: PageData;
</script>

<div class="container mx-auto py-10">
	<DataTable />
</div>
