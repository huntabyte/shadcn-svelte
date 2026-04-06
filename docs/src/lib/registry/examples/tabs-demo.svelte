<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Tabs.Root value="overview" class="w-[400px]">
	<Tabs.List>
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
		<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
		<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">
		<Card.Root>
			<Card.Header>
				<Card.Title>Overview</Card.Title>
				<Card.Description>
					View your key metrics and recent project activity. Track progress
					across all your active projects.
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				You have 12 active projects and 3 pending tasks.
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="analytics">
		<Card.Root>
			<Card.Header>
				<Card.Title>Analytics</Card.Title>
				<Card.Description>
					Track performance and user engagement metrics. Monitor trends and
					identify growth opportunities.
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				Page views are up 25% compared to last month.
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="reports">
		<Card.Root>
			<Card.Header>
				<Card.Title>Reports</Card.Title>
				<Card.Description>
					Generate and download your detailed reports. Export data in
					multiple formats for analysis.
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				You have 5 reports ready and available to export.
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="settings">
		<Card.Root>
			<Card.Header>
				<Card.Title>Settings</Card.Title>
				<Card.Description>
					Manage your account preferences and options. Customize your
					experience to fit your needs.
				</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm text-muted-foreground">
				Configure notifications, security, and themes.
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
