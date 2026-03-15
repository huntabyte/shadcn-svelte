<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Account Menu">
	<header class="flex h-14 w-full items-center gap-2">
		<Drawer.Root direction="left">
			<Drawer.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="icon" {...props}>
						<IconPlaceholder
							lucide="MenuIcon"
							hugeicons="Menu09Icon"
							tabler="IconMenu"
							phosphor="ListIcon"
							remixicon="RiMenuLine"
						/>
						<span class="sr-only">Open menu</span>
					</Button>
				{/snippet}
			</Drawer.Trigger>
			<Drawer.Content class="max-w-72">
				<Drawer.Header class="flex flex-row items-center justify-between px-5 pb-0">
					<Drawer.Title>Menu</Drawer.Title>
					<Drawer.Close>
						{#snippet child({ props })}
							<Button variant="ghost" size="icon-sm" {...props}>
								<IconPlaceholder
									lucide="XIcon"
									tabler="IconX"
									hugeicons="Cancel01Icon"
									phosphor="XIcon"
									remixicon="RiCloseLine"
								/>
								<span class="sr-only">Close</span>
							</Button>
						{/snippet}
					</Drawer.Close>
				</Drawer.Header>
				<div class="p-2">
					<Item.Group class="gap-px">
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="HomeIcon"
											tabler="IconHome"
											hugeicons="HomeIcon"
											phosphor="HouseIcon"
											remixicon="RiHomeLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Home</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="CircleIcon"
											tabler="IconCircle"
											hugeicons="CircleIcon"
											phosphor="CircleIcon"
											remixicon="RiCircleLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Issues</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="GitBranchIcon"
											tabler="IconGitBranch"
											hugeicons="GitBranchIcon"
											phosphor="GitBranchIcon"
											remixicon="RiGitBranchLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Pull requests</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="LayoutGridIcon"
											tabler="IconLayoutGrid"
											hugeicons="GridIcon"
											phosphor="GridFourIcon"
											remixicon="RiGridLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Projects</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="MailIcon"
											tabler="IconMail"
											hugeicons="MailIcon"
											phosphor="EnvelopeIcon"
											remixicon="RiMailLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Discussions</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="ServerIcon"
											tabler="IconServer"
											hugeicons="ServerStackIcon"
											phosphor="HardDrivesIcon"
											remixicon="RiServerLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Codespaces</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="BotIcon"
											tabler="IconRobot"
											hugeicons="RoboticIcon"
											phosphor="RobotIcon"
											remixicon="RiRobotLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Copilot</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="SparklesIcon"
											tabler="IconSparkles"
											hugeicons="SparklesIcon"
											phosphor="SparkleIcon"
											remixicon="RiSparklingLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Spark</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Separator />
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="SearchIcon"
											tabler="IconSearch"
											hugeicons="SearchIcon"
											phosphor="MagnifyingGlassIcon"
											remixicon="RiSearchLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Explore</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="ShoppingBagIcon"
											tabler="IconShoppingBag"
											hugeicons="ShoppingBasket01Icon"
											phosphor="BagIcon"
											remixicon="RiShoppingBagLine"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>Marketplace</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
						<Item.Root size="xs">
							{#snippet child({ props })}
								<a href="#/" {...props}>
									<Item.Media variant="icon">
										<IconPlaceholder
											lucide="LinkIcon"
											tabler="IconLink"
											hugeicons="LinkIcon"
											phosphor="LinkIcon"
											remixicon="RiLink"
										/>
									</Item.Media>
									<Item.Content>
										<Item.Title>MCP registry</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
					</Item.Group>
				</div>
			</Drawer.Content>
		</Drawer.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" class="ml-auto rounded-full" {...props}>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
							<Avatar.Fallback>SC</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Group>
					<DropdownMenu.Label class="p-0 font-normal">
						<Item.Root class="px-2 py-1 pb-0.5" size="sm">
							<Item.Media>
								<Avatar.Root>
									<Avatar.Image
										src="https://github.com/shadcn.png"
										alt="shadcn"
									/>
									<Avatar.Fallback>SC</Avatar.Fallback>
								</Avatar.Root>
							</Item.Media>
							<Item.Content class="gap-0">
								<Item.Title class="text-foreground text-sm">shadcn</Item.Title>
								<Item.Description class="text-xs">
									shadcn@example.com
								</Item.Description>
							</Item.Content>
						</Item.Root>
					</DropdownMenu.Label>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="SmileIcon"
							tabler="IconMoodSmile"
							hugeicons="SmileIcon"
							phosphor="SmileyIcon"
							remixicon="RiEmotionLine"
						/>
						Set status
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="CircleAlertIcon"
							tabler="IconExclamationCircle"
							hugeicons="AlertCircleIcon"
							phosphor="WarningCircleIcon"
							remixicon="RiErrorWarningLine"
						/>
						Single sign-on
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="UserIcon"
							tabler="IconUser"
							hugeicons="UserIcon"
							phosphor="UserIcon"
							remixicon="RiUserLine"
						/>
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="FolderIcon"
							tabler="IconFolder"
							hugeicons="FolderIcon"
							phosphor="FolderIcon"
							remixicon="RiFolderLine"
						/>
						Repositories
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="StarIcon"
							tabler="IconStar"
							hugeicons="StarIcon"
							phosphor="StarIcon"
							remixicon="RiStarLine"
						/>
						Stars
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="CodeIcon"
							tabler="IconCode"
							hugeicons="CodeIcon"
							phosphor="CodeIcon"
							remixicon="RiCodeLine"
						/>
						Gists
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="FolderIcon"
							tabler="IconFolder"
							hugeicons="FolderIcon"
							phosphor="FolderIcon"
							remixicon="RiFolderLine"
						/>
						Organizations
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="ServerIcon"
							tabler="IconServer"
							hugeicons="ServerStackIcon"
							phosphor="HardDrivesIcon"
							remixicon="RiServerLine"
						/>
						Enterprises
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="HeartIcon"
							tabler="IconHeart"
							hugeicons="FavouriteIcon"
							phosphor="HeartIcon"
							remixicon="RiHeartLine"
						/>
						Sponsors
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="SettingsIcon"
							phosphor="GearIcon"
							remixicon="RiSettingsLine"
						/>
						Settings
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="BotIcon"
							tabler="IconRobot"
							hugeicons="RoboticIcon"
							phosphor="RobotIcon"
							remixicon="RiRobotLine"
						/>
						Copilot settings
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="SparklesIcon"
							tabler="IconSparkles"
							hugeicons="SparklesIcon"
							phosphor="SparkleIcon"
							remixicon="RiSparklingLine"
						/>
						Feature preview
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="MonitorIcon"
							tabler="IconDeviceDesktop"
							hugeicons="ComputerIcon"
							phosphor="MonitorIcon"
							remixicon="RiComputerLine"
						/>
						Appearance
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="UserIcon"
							tabler="IconUser"
							hugeicons="UserIcon"
							phosphor="UserIcon"
							remixicon="RiUserLine"
						/>
						Accessibility
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="ArrowUpIcon"
							tabler="IconArrowUp"
							hugeicons="ArrowUpIcon"
							phosphor="ArrowUpIcon"
							remixicon="RiArrowUpLine"
						/>
						Upgrade
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
						remixicon="RiLogoutBoxLine"
					/>
					Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>
</Example>
