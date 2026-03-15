<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Tabs.Root orientation="vertical" value="account" class="flex gap-4">
	<Tabs.List class="h-auto w-36 flex-col">
		<Tabs.Trigger value="account" class="w-full justify-start">Account</Tabs.Trigger>
		<Tabs.Trigger value="password" class="w-full justify-start">Password</Tabs.Trigger>
		<Tabs.Trigger value="settings" class="w-full justify-start">Settings</Tabs.Trigger>
	</Tabs.List>
	<div class="flex-1">
		<Tabs.Content value="account">
			<div class="space-y-2">
				<h3 class="font-medium">Account settings</h3>
				<p class="text-muted-foreground text-sm">
					Manage your account details and preferences.
				</p>
			</div>
		</Tabs.Content>
		<Tabs.Content value="password">
			<div class="space-y-2">
				<h3 class="font-medium">Password settings</h3>
				<p class="text-muted-foreground text-sm">
					Change your password and security settings.
				</p>
			</div>
		</Tabs.Content>
		<Tabs.Content value="settings">
			<div class="space-y-2">
				<h3 class="font-medium">General settings</h3>
				<p class="text-muted-foreground text-sm">
					Manage your general application preferences.
				</p>
			</div>
		</Tabs.Content>
	</div>
</Tabs.Root>
