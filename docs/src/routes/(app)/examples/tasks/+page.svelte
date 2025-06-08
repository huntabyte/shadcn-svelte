<script lang="ts">
	import DataTable from "./components/data-table.svelte";
	import UserNav from "./components/user-nav.svelte";
	import { data } from "./data/tasks.js";
</script>

<div class="md:hidden">
	<img src="/img/examples/tasks-light.png" alt="Tasks" class="block dark:hidden" />
	<img src="/img/examples/tasks-dark.png" alt="Tasks" class="hidden dark:block" />
</div>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-2xl font-semibold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here&apos;s a list of your tasks for this month.</p>
		</div>
		<div class="flex items-center gap-2">
			<UserNav />
		</div>
	</div>
	<DataTable {data} />
</div>
