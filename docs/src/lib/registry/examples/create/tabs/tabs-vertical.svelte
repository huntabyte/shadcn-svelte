<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Example title="Vertical">
	<Tabs.Root value="account" orientation="vertical">
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
				Update your password to keep your account secure. Use a strong password with a mix
				of letters, numbers, and symbols.
			</Tabs.Content>
			<Tabs.Content value="notifications">
				Configure how you receive notifications and alerts. Choose which types of
				notifications you want to receive and how you want to receive them.
			</Tabs.Content>
		</div>
	</Tabs.Root>
</Example>
