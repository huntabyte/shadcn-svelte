<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import CircleQuestionMarkIcon from "@lucide/svelte/icons/circle-question-mark";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import EyeIcon from "@lucide/svelte/icons/eye";
	import FileIcon from "@lucide/svelte/icons/file";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import FolderOpenIcon from "@lucide/svelte/icons/folder-open";
	import FolderSearchIcon from "@lucide/svelte/icons/folder-search";
	import KeyboardIcon from "@lucide/svelte/icons/keyboard";
	import LanguagesIcon from "@lucide/svelte/icons/languages";
	import LayoutPanelLeftIcon from "@lucide/svelte/icons/layout-panel-left";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import MailIcon from "@lucide/svelte/icons/mail";
	import MonitorIcon from "@lucide/svelte/icons/monitor";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import SaveIcon from "@lucide/svelte/icons/save";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import ShieldIcon from "@lucide/svelte/icons/shield";
	import SunIcon from "@lucide/svelte/icons/sun";
	import UserIcon from "@lucide/svelte/icons/user";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let notifications = $state({
		email: true,
		sms: false,
		push: true,
	});
	let theme = $state("light");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
		Complex Menu
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-44">
		<DropdownMenu.Group>
			<DropdownMenu.Label>File</DropdownMenu.Label>
			<DropdownMenu.Item>
				<FileIcon />
				New File
				<DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<FolderIcon />
				New Folder
				<DropdownMenu.Shortcut>⇧⌘N</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<FolderOpenIcon />
					Open Recent
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Recent Projects</DropdownMenu.Label>
						<DropdownMenu.Item>
							<FileCodeIcon />
							Project Alpha
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<FileCodeIcon />
							Project Beta
						</DropdownMenu.Item>
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger>
								<EllipsisIcon />
								More Projects
							</DropdownMenu.SubTrigger>
							<DropdownMenu.SubContent>
								<DropdownMenu.Item>
									<FileCodeIcon />
									Project Gamma
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<FileCodeIcon />
									Project Delta
								</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Sub>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<FolderSearchIcon />
							Browse...
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<SaveIcon />
				Save
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<DownloadIcon />
				Export
				<DropdownMenu.Shortcut>⇧⌘E</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Label>View</DropdownMenu.Label>
			<DropdownMenu.CheckboxItem bind:checked={notifications.email}>
				<EyeIcon />
				Show Sidebar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={notifications.sms}>
				<LayoutPanelLeftIcon />
				Show Status Bar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<PaletteIcon />
					Theme
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Appearance</DropdownMenu.Label>
						<DropdownMenu.RadioGroup bind:value={theme}>
							<DropdownMenu.RadioItem value="light">
								<SunIcon />
								Light
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="dark">
								<MoonIcon />
								Dark
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="system">
								<MonitorIcon />
								System
							</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Label>Account</DropdownMenu.Label>
			<DropdownMenu.Item>
				<UserIcon />
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCardIcon />
				Billing
			</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<SettingsIcon />
					Settings
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Preferences</DropdownMenu.Label>
						<DropdownMenu.Item>
							<KeyboardIcon />
							Keyboard Shortcuts
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<LanguagesIcon />
							Language
						</DropdownMenu.Item>
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger>
								<BellIcon />
								Notifications
							</DropdownMenu.SubTrigger>
							<DropdownMenu.SubContent>
								<DropdownMenu.Group>
									<DropdownMenu.Label>Notification Types</DropdownMenu.Label>
									<DropdownMenu.CheckboxItem bind:checked={notifications.push}>
										<BellIcon />
										Push Notifications
									</DropdownMenu.CheckboxItem>
									<DropdownMenu.CheckboxItem bind:checked={notifications.email}>
										<MailIcon />
										Email Notifications
									</DropdownMenu.CheckboxItem>
								</DropdownMenu.Group>
							</DropdownMenu.SubContent>
						</DropdownMenu.Sub>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<ShieldIcon />
							Privacy & Security
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<CircleQuestionMarkIcon />
				Help & Support
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<FileTextIcon />
				Documentation
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item variant="destructive">
				<LogOutIcon />
				Sign Out
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
