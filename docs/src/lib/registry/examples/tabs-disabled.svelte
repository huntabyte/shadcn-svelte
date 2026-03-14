<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Tabs.Root value="account" class="w-[400px]">
	<Tabs.List>
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="password" disabled>Password</Tabs.Trigger>
		<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">
		<p class="text-muted-foreground py-4 text-sm">Account settings and preferences.</p>
	</Tabs.Content>
	<Tabs.Content value="password">
		<p class="text-muted-foreground py-4 text-sm">Password settings.</p>
	</Tabs.Content>
	<Tabs.Content value="settings">
		<p class="text-muted-foreground py-4 text-sm">General settings.</p>
	</Tabs.Content>
</Tabs.Root>
