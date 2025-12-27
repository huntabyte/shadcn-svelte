<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let notifications = $state({
		email: true,
		sms: false,
		push: true,
	});
	let theme = $state("light");
</script>

<Example title="Complex">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Complex Menu</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="style-maia:w-56 style-mira:w-48 style-nova:w-48 style-vega:w-56 style-lyra:w-48"
		>
			<DropdownMenu.Group>
				<DropdownMenu.Label>File</DropdownMenu.Label>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="FileIcon"
						tabler="IconFile"
						hugeicons="FileIcon"
						phosphor="FileIcon"
					/>
					New File
					<DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="FolderIcon"
						tabler="IconFolder"
						hugeicons="FolderIcon"
						phosphor="FolderIcon"
					/>
					New Folder
					<DropdownMenu.Shortcut>⇧⌘N</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<IconPlaceholder
							lucide="FolderOpenIcon"
							tabler="IconFolderOpen"
							hugeicons="FolderOpenIcon"
							phosphor="FolderOpenIcon"
						/>
						Open Recent
					</DropdownMenu.SubTrigger>
					<DropdownMenu.Portal>
						<DropdownMenu.SubContent>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Recent Projects</DropdownMenu.Label>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="FileCodeIcon"
										tabler="IconFileCode"
										hugeicons="CodeIcon"
										phosphor="CodeIcon"
									/>
									Project Alpha
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="FileCodeIcon"
										tabler="IconFileCode"
										hugeicons="CodeIcon"
										phosphor="CodeIcon"
									/>
									Project Beta
								</DropdownMenu.Item>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger>
										<IconPlaceholder
											lucide="MoreHorizontalIcon"
											tabler="IconDots"
											hugeicons="MoreHorizontalCircle01Icon"
											phosphor="DotsThreeOutlineIcon"
										/>
										More Projects
									</DropdownMenu.SubTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubContent>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="FileCodeIcon"
													tabler="IconFileCode"
													hugeicons="CodeIcon"
													phosphor="FileCodeIcon"
												/>
												Project Gamma
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<IconPlaceholder
													lucide="FileCodeIcon"
													tabler="IconFileCode"
													hugeicons="CodeIcon"
													phosphor="FileCodeIcon"
												/>
												Project Delta
											</DropdownMenu.Item>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="FolderSearchIcon"
										tabler="IconFolderSearch"
										hugeicons="SearchIcon"
										phosphor="MagnifyingGlassIcon"
									/>
									Browse...
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.SubContent>
					</DropdownMenu.Portal>
				</DropdownMenu.Sub>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="SaveIcon"
						tabler="IconDeviceFloppy"
						hugeicons="FloppyDiskIcon"
						phosphor="FloppyDiskIcon"
					/>
					Save
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="DownloadIcon"
						tabler="IconDownload"
						hugeicons="DownloadIcon"
						phosphor="DownloadIcon"
					/>
					Export
					<DropdownMenu.Shortcut>⇧⌘E</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Label>View</DropdownMenu.Label>
				<DropdownMenu.CheckboxItem
					checked={notifications.email}
					onCheckedChange={(checked) =>
						(notifications = { ...notifications, email: checked === true })}
				>
					<IconPlaceholder
						lucide="EyeIcon"
						tabler="IconEye"
						hugeicons="EyeIcon"
						phosphor="EyeIcon"
					/>
					Show Sidebar
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem
					checked={notifications.sms}
					onCheckedChange={(checked) =>
						(notifications = { ...notifications, sms: checked === true })}
				>
					<IconPlaceholder
						lucide="LayoutIcon"
						tabler="IconLayout"
						hugeicons="LayoutIcon"
						phosphor="LayoutIcon"
					/>
					Show Status Bar
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<IconPlaceholder
							lucide="PaletteIcon"
							tabler="IconPalette"
							hugeicons="PaintBoardIcon"
							phosphor="PaletteIcon"
						/>
						Theme
					</DropdownMenu.SubTrigger>
					<DropdownMenu.Portal>
						<DropdownMenu.SubContent>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Appearance</DropdownMenu.Label>
								<DropdownMenu.RadioGroup bind:value={theme}>
									<DropdownMenu.RadioItem value="light">
										<IconPlaceholder
											lucide="SunIcon"
											tabler="IconSun"
											hugeicons="SunIcon"
											phosphor="SunIcon"
										/>
										Light
									</DropdownMenu.RadioItem>
									<DropdownMenu.RadioItem value="dark">
										<IconPlaceholder
											lucide="MoonIcon"
											tabler="IconMoon"
											hugeicons="MoonIcon"
											phosphor="MoonIcon"
										/>
										Dark
									</DropdownMenu.RadioItem>
									<DropdownMenu.RadioItem value="system">
										<IconPlaceholder
											lucide="MonitorIcon"
											tabler="IconDeviceDesktop"
											hugeicons="ComputerIcon"
											phosphor="MonitorIcon"
										/>
										System
									</DropdownMenu.RadioItem>
								</DropdownMenu.RadioGroup>
							</DropdownMenu.Group>
						</DropdownMenu.SubContent>
					</DropdownMenu.Portal>
				</DropdownMenu.Sub>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Label>Account</DropdownMenu.Label>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="UserIcon"
						tabler="IconUser"
						hugeicons="UserIcon"
						phosphor="UserIcon"
					/>
					Profile
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="CreditCardIcon"
						tabler="IconCreditCard"
						hugeicons="CreditCardIcon"
						phosphor="CreditCardIcon"
					/>
					Billing
				</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="SettingsIcon"
							phosphor="GearIcon"
						/>
						Settings
					</DropdownMenu.SubTrigger>
					<DropdownMenu.Portal>
						<DropdownMenu.SubContent>
							<DropdownMenu.Group>
								<DropdownMenu.Label>Preferences</DropdownMenu.Label>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="KeyboardIcon"
										tabler="IconKeyboard"
										hugeicons="KeyboardIcon"
										phosphor="KeyboardIcon"
									/>
									Keyboard Shortcuts
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="LanguagesIcon"
										tabler="IconLanguage"
										hugeicons="LanguageCircleIcon"
										phosphor="TranslateIcon"
									/>
									Language
								</DropdownMenu.Item>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger>
										<IconPlaceholder
											lucide="BellIcon"
											tabler="IconBell"
											hugeicons="NotificationIcon"
											phosphor="BellIcon"
										/>
										Notifications
									</DropdownMenu.SubTrigger>
									<DropdownMenu.Portal>
										<DropdownMenu.SubContent>
											<DropdownMenu.Group>
												<DropdownMenu.Label>
													Notification Types
												</DropdownMenu.Label>
												<DropdownMenu.CheckboxItem
													checked={notifications.push}
													onCheckedChange={(checked) =>
														(notifications = {
															...notifications,
															push: checked === true,
														})}
												>
													<IconPlaceholder
														lucide="BellIcon"
														tabler="IconBell"
														hugeicons="NotificationIcon"
														phosphor="BellIcon"
													/>
													Push Notifications
												</DropdownMenu.CheckboxItem>
												<DropdownMenu.CheckboxItem
													checked={notifications.email}
													onCheckedChange={(checked) =>
														(notifications = {
															...notifications,
															email: checked === true,
														})}
												>
													<IconPlaceholder
														lucide="MailIcon"
														tabler="IconMail"
														hugeicons="MailIcon"
														phosphor="EnvelopeIcon"
													/>
													Email Notifications
												</DropdownMenu.CheckboxItem>
											</DropdownMenu.Group>
										</DropdownMenu.SubContent>
									</DropdownMenu.Portal>
								</DropdownMenu.Sub>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="ShieldIcon"
										tabler="IconShield"
										hugeicons="ShieldIcon"
										phosphor="ShieldIcon"
									/>
									Privacy & Security
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.SubContent>
					</DropdownMenu.Portal>
				</DropdownMenu.Sub>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="HelpCircleIcon"
						tabler="IconHelpCircle"
						hugeicons="HelpCircleIcon"
						phosphor="QuestionIcon"
					/>
					Help & Support
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="FileTextIcon"
						tabler="IconFileText"
						hugeicons="File01Icon"
						phosphor="FileTextIcon"
					/>
					Documentation
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item variant="destructive">
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
					/>
					Sign Out
					<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
