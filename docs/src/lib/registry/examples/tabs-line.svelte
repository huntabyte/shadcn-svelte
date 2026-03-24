<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Tabs.Root value="overview" class="w-full max-w-sm">
	<Tabs.List variant="line">
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
		<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">
		<div class="space-y-2 pt-4">
			<h3 class="font-medium">Overview</h3>
			<p class="text-muted-foreground text-sm">
				View a summary of your project's performance.
			</p>
		</div>
	</Tabs.Content>
	<Tabs.Content value="analytics">
		<div class="space-y-2 pt-4">
			<h3 class="font-medium">Analytics</h3>
			<p class="text-muted-foreground text-sm">
				Detailed analytics and metrics for your project.
			</p>
		</div>
	</Tabs.Content>
	<Tabs.Content value="reports">
		<div class="space-y-2 pt-4">
			<h3 class="font-medium">Reports</h3>
			<p class="text-muted-foreground text-sm">Generated reports and exports.</p>
		</div>
	</Tabs.Content>
</Tabs.Root>
