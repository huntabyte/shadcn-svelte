<script lang="ts">
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import data from "./(data)/tasks.json";
	import TasksLight from "$lib/img/examples/tasks-light.png?enhanced";
	import TasksDark from "$lib/img/examples/tasks-dark.png?enhanced";
</script>

<div class="md:hidden">
	<enhanced:img src={TasksLight} alt="Tasks" class="block dark:hidden" />
	<enhanced:img src={TasksDark} alt="Tasks" class="hidden dark:block" />
</div>
<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	<DataTable {data} />
</div>
