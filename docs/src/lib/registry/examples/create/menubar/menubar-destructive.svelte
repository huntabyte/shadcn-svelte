<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Destructive">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>File</Menubar.Trigger>
			<Menubar.Content class="w-40">
				<Menubar.Item>
					<IconPlaceholder
						lucide="FileIcon"
						tabler="IconFile"
						hugeicons="FileIcon"
						phosphor="FileIcon"
					/>
					New File <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="FolderIcon"
						tabler="IconFolder"
						hugeicons="FolderIcon"
						phosphor="FolderIcon"
					/>
					Open Folder
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item variant="destructive">
					<IconPlaceholder
						lucide="TrashIcon"
						tabler="IconTrash"
						hugeicons="DeleteIcon"
						phosphor="TrashIcon"
					/>
					Delete File <Menubar.Shortcut>⌘⌫</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Account</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					<IconPlaceholder
						lucide="UserIcon"
						tabler="IconUser"
						hugeicons="UserIcon"
						phosphor="UserIcon"
					/>
					Profile
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="SettingsIcon"
						tabler="IconSettings"
						hugeicons="SettingsIcon"
						phosphor="GearIcon"
					/>
					Settings
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item variant="destructive">
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
					/>
					Sign out
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item variant="destructive">
					<IconPlaceholder
						lucide="TrashIcon"
						tabler="IconTrash"
						hugeicons="DeleteIcon"
						phosphor="TrashIcon"
					/>
					Delete
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
