<script lang="ts">
	import UserNav from "./(components)/user-nav.svelte";
</script>

<div class="md:hidden">
	<enhanced:img src="$lib/img/examples/tasks-light.png" alt="Tasks" class="block dark:hidden"
	></enhanced:img>
	<enhanced:img src="$lib/img/examples/tasks-dark.png" alt="Tasks" class="hidden dark:block"
	></enhanced:img>
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
	<!-- <DataTable {data} /> -->
</div>
