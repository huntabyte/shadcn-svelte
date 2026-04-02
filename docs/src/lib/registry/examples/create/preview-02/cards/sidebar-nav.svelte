<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<div class="grid grid-cols-2 items-start gap-6">
	<Card.Root class="overflow-hidden py-0">
		<Sidebar.Provider class="min-h-0">
			<Sidebar.Root collapsible="none" class="w-full bg-transparent">
				<Sidebar.Content class="gap-0">
					<Sidebar.Group class="pb-1">
						<Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<IconPlaceholder
											lucide="LayoutDashboardIcon"
											tabler="IconLayoutDashboard"
											hugeicons="DashboardSquare01Icon"
											phosphor="SquaresFourIcon"
											remixicon="RiDashboardLine"
										/>
										Dashboard
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="ArrowLeftRightIcon"
											tabler="IconArrowsLeftRight"
											hugeicons="ArrowDataTransferHorizontalIcon"
											phosphor="ArrowsLeftRightIcon"
											remixicon="RiArrowLeftRightLine"
										/>
										Transactions
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="TrendingUpIcon"
											tabler="IconTrendingUp"
											hugeicons="AnalyticsUpIcon"
											phosphor="TrendUpIcon"
											remixicon="RiLineChartLine"
										/>
										Investments
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
					<Sidebar.Separator class="w-auto!" />
					<Sidebar.Group class="pt-1">
						<Sidebar.GroupLabel>Planning</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="TargetIcon"
											tabler="IconTarget"
											hugeicons="Target02Icon"
											phosphor="TargetIcon"
											remixicon="RiFocus3Line"
										/>
										Goals
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="WalletIcon"
											tabler="IconWallet"
											hugeicons="Wallet01Icon"
											phosphor="WalletIcon"
											remixicon="RiWalletLine"
										/>
										Budget
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="FileBarChartIcon"
											tabler="IconReportAnalytics"
											hugeicons="ChartBarLineIcon"
											phosphor="ChartBarIcon"
											remixicon="RiBarChartLine"
										/>
										Reports
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="FileTextIcon"
											tabler="IconFileText"
											hugeicons="File02Icon"
											phosphor="FileTextIcon"
											remixicon="RiFileTextLine"
										/>
										Documents
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
		</Sidebar.Provider>
	</Card.Root>
	<Card.Root class="overflow-hidden py-0">
		<Sidebar.Provider class="min-h-0">
			<Sidebar.Root collapsible="none" class="w-full bg-transparent">
				<Sidebar.Content class="gap-0">
					<Sidebar.Group class="pb-1">
						<Sidebar.GroupLabel>Account</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="UserIcon"
											tabler="IconUser"
											hugeicons="UserIcon"
											phosphor="UserIcon"
											remixicon="RiUserLine"
										/>
										Profile
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive>
										<IconPlaceholder
											lucide="CreditCardIcon"
											tabler="IconCreditCard"
											hugeicons="CreditCardIcon"
											phosphor="CreditCardIcon"
											remixicon="RiBankCardLine"
										/>
										Billing
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="BellIcon"
											tabler="IconBell"
											hugeicons="Notification03Icon"
											phosphor="BellIcon"
											remixicon="RiBellLine"
										/>
										Notifications
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="ShieldIcon"
											tabler="IconShield"
											hugeicons="ShieldIcon"
											phosphor="ShieldIcon"
											remixicon="RiShieldLine"
										/>
										Security
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
					<Sidebar.Separator class="w-auto!" />
					<Sidebar.Group class="pt-1">
						<Sidebar.GroupLabel>Support</Sidebar.GroupLabel>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="CircleHelpIcon"
											tabler="IconHelp"
											hugeicons="HelpCircleIcon"
											phosphor="QuestionIcon"
											remixicon="RiQuestionLine"
										/>
										Help Center
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="MessageSquareIcon"
											tabler="IconMessage"
											hugeicons="Message01Icon"
											phosphor="ChatIcon"
											remixicon="RiChat1Line"
										/>
										Contact Us
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
								<Sidebar.MenuItem>
									<Sidebar.MenuButton>
										<IconPlaceholder
											lucide="ActivityIcon"
											tabler="IconActivity"
											hugeicons="ActivityIcon"
											phosphor="PulseIcon"
											remixicon="RiPulseLine"
										/>
										Status
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
		</Sidebar.Provider>
	</Card.Root>
</div>
