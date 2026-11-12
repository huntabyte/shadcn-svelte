<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";

	const tabs = [
		{
			value: "overview",
			title: "Overview",
			description:
				"View your key metrics and recent project activity. Track progress across all your active projects.",
			content: "You have 12 active projects and 3 pending tasks.",
		},
		{
			value: "analytics",
			title: "Analytics",
			description:
				"Track performance and user engagement metrics. Monitor trends and identify growth opportunities.",
			content: "Page views are up 25% compared to last month.",
		},
		{
			value: "reports",
			title: "Reports",
			description:
				"Generate and download your detailed reports. Export data in multiple formats for analysis.",
			content: "You have 5 reports ready and available to export.",
		},
		{
			value: "settings",
			title: "Settings",
			description:
				"Manage your account preferences and options. Customize your experience to fit your needs.",
			content: "Configure notifications, security, and themes.",
		},
	];
</script>

<Tabs.Root value="overview" class="w-[400px]">
	<Tabs.List>
		{#each tabs as tab (tab.value)}
			<Tabs.Trigger value={tab.value}>{tab.title}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each tabs as tab (tab.value)}
		<Tabs.Content value={tab.value}>
			<Card.Root>
				<Card.Header>
					<Card.Title>{tab.title}</Card.Title>
					<Card.Description>{tab.description}</Card.Description>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">{tab.content}</Card.Content>
			</Card.Root>
		</Tabs.Content>
	{/each}
</Tabs.Root>
