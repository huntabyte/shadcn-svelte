<script lang="ts">
	import {
		ActivityIcon,
		Analytics01Icon,
		AnalyticsUpIcon,
		ArrowDataTransferHorizontalIcon,
		BankIcon,
		BookOpen02Icon,
		Calendar03Icon,
		ChartBarLineIcon,
		CreditCardIcon,
		File02Icon,
		Globe02Icon,
		HelpCircleIcon,
		Message01Icon,
		Notification03Icon,
		PaintBoardIcon,
		PieChartIcon,
		ShieldIcon,
		Target02Icon,
		UserIcon,
		Wallet01Icon,
	} from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";

	import { SidebarMenuButton, SidebarMenuItem } from "$lib/registry/ui/sidebar/index.js";
	import SidebarSection from "./sidebar-section.svelte";
</script>

<div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
	<SidebarSection label="Overview" class="xl:col-start-1 xl:row-start-2">
		<SidebarMenuItem>
			<SidebarMenuButton isActive={true}>
				<HugeiconsIcon icon={Analytics01Icon} stroke-width={2}></HugeiconsIcon>
				Analytics
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={ArrowDataTransferHorizontalIcon} stroke-width={2}
				></HugeiconsIcon>
				Transactions
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={AnalyticsUpIcon} stroke-width={2}></HugeiconsIcon>
				Investments
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={BankIcon} stroke-width={2}></HugeiconsIcon>
				Accounts
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={PieChartIcon} stroke-width={2}></HugeiconsIcon>
				Spending
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarSection>

	<SidebarSection label="Planning" class="xl:col-start-1 xl:row-start-1">
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={File02Icon} stroke-width={2}></HugeiconsIcon>
				Documents
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Wallet01Icon} stroke-width={2}></HugeiconsIcon>
				Budget
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={ChartBarLineIcon} stroke-width={2}></HugeiconsIcon>
				Reports
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Target02Icon} stroke-width={2}></HugeiconsIcon>
				Goals
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Calendar03Icon} stroke-width={2}></HugeiconsIcon>
				Calendar
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarSection>

	<SidebarSection label="Support" class="flex xl:col-start-2 xl:row-start-1">
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={HelpCircleIcon} stroke-width={2}></HugeiconsIcon>
				Help Center
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={BookOpen02Icon} stroke-width={2}></HugeiconsIcon>
				Docs
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Message01Icon} stroke-width={2}></HugeiconsIcon>
				Contact Us
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={ActivityIcon} stroke-width={2}></HugeiconsIcon>
				Status
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Globe02Icon} stroke-width={2}></HugeiconsIcon>
				Community
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarSection>

	<SidebarSection label="Account" class="flex xl:col-start-2 xl:row-start-2">
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={UserIcon} stroke-width={2}></HugeiconsIcon>
				Profile
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton isActive={true}>
				<HugeiconsIcon icon={CreditCardIcon} stroke-width={2}></HugeiconsIcon>
				Billing
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={Notification03Icon} stroke-width={2}></HugeiconsIcon>
				Notifications
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={ShieldIcon} stroke-width={2}></HugeiconsIcon>
				Security
			</SidebarMenuButton>
		</SidebarMenuItem>
		<SidebarMenuItem>
			<SidebarMenuButton>
				<HugeiconsIcon icon={PaintBoardIcon} stroke-width={2}></HugeiconsIcon>
				Appearance
			</SidebarMenuButton>
		</SidebarMenuItem>
	</SidebarSection>
</div>
