<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import CalculatorIcon from "@lucide/svelte/icons/calculator";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import ClipboardPasteIcon from "@lucide/svelte/icons/clipboard-paste";
	import CodeIcon from "@lucide/svelte/icons/code";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import FolderPlusIcon from "@lucide/svelte/icons/folder-plus";
	import HelpCircleIcon from "@lucide/svelte/icons/help-circle";
	import HomeIcon from "@lucide/svelte/icons/home";
	import ImageIcon from "@lucide/svelte/icons/image";
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import LayoutGridIcon from "@lucide/svelte/icons/layout-grid";
	import ListIcon from "@lucide/svelte/icons/list";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import ScissorsIcon from "@lucide/svelte/icons/scissors";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import TrashIcon from "@lucide/svelte/icons/trash";
	import UserIcon from "@lucide/svelte/icons/user";
	import ZoomInIcon from "@lucide/svelte/icons/zoom-in";
	import ZoomOutIcon from "@lucide/svelte/icons/zoom-out";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let open = $state(false);
</script>

<div class="flex flex-col gap-4">
	<Button onclick={() => (open = true)} variant="outline" class="w-fit">Open Menu</Button>
	<Command.Dialog bind:open>
		<Command.Input placeholder="Type a command or search..." />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>
			<Command.Group heading="Navigation">
				<Command.Item>
					<HomeIcon />
					<span>Home</span>
					<Command.Shortcut>⌘H</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<InboxIcon />
					<span>Inbox</span>
					<Command.Shortcut>⌘I</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<FileTextIcon />
					<span>Documents</span>
					<Command.Shortcut>⌘D</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<FolderIcon />
					<span>Folders</span>
					<Command.Shortcut>⌘F</Command.Shortcut>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Actions">
				<Command.Item>
					<PlusIcon />
					<span>New File</span>
					<Command.Shortcut>⌘N</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<FolderPlusIcon />
					<span>New Folder</span>
					<Command.Shortcut>⇧⌘N</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<CopyIcon />
					<span>Copy</span>
					<Command.Shortcut>⌘C</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<ScissorsIcon />
					<span>Cut</span>
					<Command.Shortcut>⌘X</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<ClipboardPasteIcon />
					<span>Paste</span>
					<Command.Shortcut>⌘V</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<TrashIcon />
					<span>Delete</span>
					<Command.Shortcut>⌫</Command.Shortcut>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="View">
				<Command.Item>
					<LayoutGridIcon />
					<span>Grid View</span>
				</Command.Item>
				<Command.Item>
					<ListIcon />
					<span>List View</span>
				</Command.Item>
				<Command.Item>
					<ZoomInIcon />
					<span>Zoom In</span>
					<Command.Shortcut>⌘+</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<ZoomOutIcon />
					<span>Zoom Out</span>
					<Command.Shortcut>⌘-</Command.Shortcut>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Account">
				<Command.Item>
					<UserIcon />
					<span>Profile</span>
					<Command.Shortcut>⌘P</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<CreditCardIcon />
					<span>Billing</span>
					<Command.Shortcut>⌘B</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<SettingsIcon />
					<span>Settings</span>
					<Command.Shortcut>⌘S</Command.Shortcut>
				</Command.Item>
				<Command.Item>
					<BellIcon />
					<span>Notifications</span>
				</Command.Item>
				<Command.Item>
					<HelpCircleIcon />
					<span>Help &amp; Support</span>
				</Command.Item>
			</Command.Group>
			<Command.Separator />
			<Command.Group heading="Tools">
				<Command.Item>
					<CalculatorIcon />
					<span>Calculator</span>
				</Command.Item>
				<Command.Item>
					<CalendarIcon />
					<span>Calendar</span>
				</Command.Item>
				<Command.Item>
					<ImageIcon />
					<span>Image Editor</span>
				</Command.Item>
				<Command.Item>
					<CodeIcon />
					<span>Code Editor</span>
				</Command.Item>
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>
