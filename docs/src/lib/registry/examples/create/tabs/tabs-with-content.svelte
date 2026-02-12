<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Example title="With Content">
	<Tabs.Root value="account">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password">Password</Tabs.Trigger>
			<Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
		</Tabs.List>
		<div class="rounded-lg border p-4">
			<Tabs.Content value="account">
				Manage your account preferences and profile information.
			</Tabs.Content>
			<Tabs.Content value="password">
				Update your password to keep your account secure.
			</Tabs.Content>
			<Tabs.Content value="notifications">
				Configure how you receive notifications and alerts.
			</Tabs.Content>
		</div>
	</Tabs.Root>
</Example>
