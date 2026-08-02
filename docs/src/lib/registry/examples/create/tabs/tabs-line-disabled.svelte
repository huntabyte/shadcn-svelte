<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Line Disabled">
	<Tabs.Root value="overview">
		<Tabs.List variant="line">
			<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
			<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
			<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</Example>
