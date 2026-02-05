<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Dropdown">
	<Tabs.Root value="overview">
		<div class="flex items-center justify-between">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
				<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
			</Tabs.List>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="ghost" size="icon" class="size-8" {...props}>
							<IconPlaceholder
								lucide="MoreHorizontalIcon"
								tabler="IconDots"
								hugeicons="MoreHorizontalCircle01Icon"
								phosphor="DotsThreeOutlineIcon"
								remixicon="RiMoreLine"
							/>
							<span class="sr-only">More options</span>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Export</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Archive</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<div class="rounded-lg border p-4">
			<Tabs.Content value="overview">
				View your dashboard metrics and key performance indicators.
			</Tabs.Content>
			<Tabs.Content value="analytics">
				Detailed analytics and insights about your data.
			</Tabs.Content>
			<Tabs.Content value="reports">Generate and view custom reports.</Tabs.Content>
		</div>
	</Tabs.Root>
</Example>
