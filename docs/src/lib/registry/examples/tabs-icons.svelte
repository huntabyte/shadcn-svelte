<script lang="ts">
	import UserIcon from "@lucide/svelte/icons/user";
	import LockIcon from "@lucide/svelte/icons/lock";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Tabs.Root value="account" class="w-[400px]">
	<Tabs.List>
		<Tabs.Trigger value="account" class="gap-2">
			<UserIcon class="size-4" />
			Account
		</Tabs.Trigger>
		<Tabs.Trigger value="password" class="gap-2">
			<LockIcon class="size-4" />
			Password
		</Tabs.Trigger>
		<Tabs.Trigger value="settings" class="gap-2">
			<SettingsIcon class="size-4" />
			Settings
		</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">
		<p class="text-muted-foreground text-sm py-4">Account settings and preferences.</p>
	</Tabs.Content>
	<Tabs.Content value="password">
		<p class="text-muted-foreground text-sm py-4">Password and security settings.</p>
	</Tabs.Content>
	<Tabs.Content value="settings">
		<p class="text-muted-foreground text-sm py-4">General application settings.</p>
	</Tabs.Content>
</Tabs.Root>
