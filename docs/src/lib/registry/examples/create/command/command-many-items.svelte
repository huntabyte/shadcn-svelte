<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let open = $state(false);
</script>

<Example title="Many Groups & Items">
	<div class="flex flex-col gap-4">
		<Button onclick={() => (open = true)} variant="outline" class="w-fit">Open Menu</Button>
		<Command.Dialog bind:open>
			<Command.Input placeholder="Type a command or search..." />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Navigation">
					<Command.Item>
						<IconPlaceholder
							lucide="HomeIcon"
							tabler="IconHome"
							hugeicons="HomeIcon"
							phosphor="HouseIcon"
						/>
						<span>Home</span>
						<Command.Shortcut>⌘H</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="InboxIcon"
							tabler="IconInbox"
							hugeicons="InboxIcon"
							phosphor="TrayIcon"
						/>
						<span>Inbox</span>
						<Command.Shortcut>⌘I</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="FileTextIcon"
							tabler="IconFileText"
							hugeicons="File02Icon"
							phosphor="FileTextIcon"
						/>
						<span>Documents</span>
						<Command.Shortcut>⌘D</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="FolderIcon"
							tabler="IconFolder"
							hugeicons="FolderIcon"
							phosphor="FolderIcon"
						/>
						<span>Folders</span>
						<Command.Shortcut>⌘F</Command.Shortcut>
					</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Actions">
					<Command.Item>
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="PlusSignIcon"
							phosphor="PlusIcon"
						/>
						<span>New File</span>
						<Command.Shortcut>⌘N</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="FolderPlusIcon"
							tabler="IconFolderPlus"
							hugeicons="FolderAddIcon"
							phosphor="FolderPlusIcon"
						/>
						<span>New Folder</span>
						<Command.Shortcut>⇧⌘N</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
						/>
						<span>Copy</span>
						<Command.Shortcut>⌘C</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ScissorsIcon"
							tabler="IconCut"
							hugeicons="ScissorIcon"
							phosphor="ScissorsIcon"
						/>
						<span>Cut</span>
						<Command.Shortcut>⌘X</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ClipboardPasteIcon"
							tabler="IconClipboard"
							hugeicons="ClipboardIcon"
							phosphor="ClipboardIcon"
						/>
						<span>Paste</span>
						<Command.Shortcut>⌘V</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="TrashIcon"
							tabler="IconTrash"
							hugeicons="DeleteIcon"
							phosphor="TrashIcon"
						/>
						<span>Delete</span>
						<Command.Shortcut>⌫</Command.Shortcut>
					</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="View">
					<Command.Item>
						<IconPlaceholder
							lucide="LayoutGridIcon"
							tabler="IconLayoutGrid"
							hugeicons="GridIcon"
							phosphor="GridFourIcon"
						/>
						<span>Grid View</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ListIcon"
							tabler="IconList"
							hugeicons="Menu05Icon"
							phosphor="ListIcon"
						/>
						<span>List View</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ZoomInIcon"
							tabler="IconZoomIn"
							hugeicons="ZoomInAreaIcon"
							phosphor="MagnifyingGlassPlusIcon"
						/>
						<span>Zoom In</span>
						<Command.Shortcut>⌘+</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ZoomOutIcon"
							tabler="IconZoomOut"
							hugeicons="ZoomOutAreaIcon"
							phosphor="MagnifyingGlassMinusIcon"
						/>
						<span>Zoom Out</span>
						<Command.Shortcut>⌘-</Command.Shortcut>
					</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Account">
					<Command.Item>
						<IconPlaceholder
							lucide="UserIcon"
							tabler="IconUser"
							hugeicons="UserIcon"
							phosphor="UserIcon"
						/>
						<span>Profile</span>
						<Command.Shortcut>⌘P</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="CreditCardIcon"
							tabler="IconCreditCard"
							hugeicons="CreditCardIcon"
							phosphor="CreditCardIcon"
						/>
						<span>Billing</span>
						<Command.Shortcut>⌘B</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="SettingsIcon"
							phosphor="GearIcon"
						/>
						<span>Settings</span>
						<Command.Shortcut>⌘S</Command.Shortcut>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="BellIcon"
							tabler="IconBell"
							hugeicons="NotificationIcon"
							phosphor="BellIcon"
						/>
						<span>Notifications</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="HelpCircleIcon"
							tabler="IconHelpCircle"
							hugeicons="HelpCircleIcon"
							phosphor="QuestionIcon"
						/>
						<span>Help & Support</span>
					</Command.Item>
				</Command.Group>
				<Command.Separator />
				<Command.Group heading="Tools">
					<Command.Item>
						<IconPlaceholder
							lucide="CalculatorIcon"
							tabler="IconCalculator"
							hugeicons="CalculatorIcon"
							phosphor="CalculatorIcon"
						/>
						<span>Calculator</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="CalendarIcon"
							tabler="IconCalendar"
							hugeicons="CalendarIcon"
							phosphor="CalendarBlankIcon"
						/>
						<span>Calendar</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="ImageIcon"
							tabler="IconPhoto"
							hugeicons="ImageIcon"
							phosphor="ImageIcon"
						/>
						<span>Image Editor</span>
					</Command.Item>
					<Command.Item>
						<IconPlaceholder
							lucide="CodeIcon"
							tabler="IconCode"
							hugeicons="CodeIcon"
							phosphor="CodeIcon"
						/>
						<span>Code Editor</span>
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Dialog>
	</div>
</Example>
