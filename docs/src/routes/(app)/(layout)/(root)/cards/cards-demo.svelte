<script lang="ts">
	import AccountAccess from "./account-access.svelte";
	import AnalyticsCard from "./analytics-card.svelte";
	import ClaimableBalance from "./claimable-balance.svelte";
	import ContributionHistory from "./contribution-history.svelte";
	import DividendIncome from "./dividend-income.svelte";
	import EmptyDistributeTrack from "./empty-distribute-track.svelte";
	import NewMilestone from "./new-milestone.svelte";
	import NotificationSettings from "./notification-settings.svelte";
	import Payments from "./payments.svelte";
	import PayoutThreshold from "./payout-threshold.svelte";
	import PowerUsage from "./power-usage.svelte";
	import QrConnect from "./qr-connect.svelte";
	import SavingsTargets from "./savings-targets.svelte";
	import SidebarNav from "./sidebar-nav.svelte";
	import SkeletonAccountAccess from "./skeleton/account-access.svelte";
	import SkeletonAnalyticsCard from "./skeleton/analytics-card.svelte";
	import SkeletonClaimableBalance from "./skeleton/claimable-balance.svelte";
	import SkeletonContributionHistory from "./skeleton/contribution-history.svelte";
	import SkeletonDividendIncome from "./skeleton/dividend-income.svelte";
	import SkeletonEmptyDistributeTrack from "./skeleton/empty-distribute-track.svelte";
	import SkeletonNewMilestone from "./skeleton/new-milestone.svelte";
	import SkeletonNotificationSettings from "./skeleton/notification-settings.svelte";
	import SkeletonPayments from "./skeleton/payments.svelte";
	import SkeletonPayoutThreshold from "./skeleton/payout-threshold.svelte";
	import SkeletonPowerUsage from "./skeleton/power-usage.svelte";
	import SkeletonQrConnect from "./skeleton/qr-connect.svelte";
	import SkeletonSavingsTargets from "./skeleton/savings-targets.svelte";
	import SkeletonTransferFunds from "./skeleton/transfer-funds.svelte";
	import SkeletonUIElements from "./skeleton/ui-elements.svelte";
	import TransferFunds from "./transfer-funds.svelte";
	import UIElements from "./ui-elements.svelte";
</script>

{#snippet CardsSkeletonRails()}
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-12 z-10 hidden min-[2200px]:block [&_[data-slot=skeleton]:nth-child(even)]:hidden"
	>
		<div
			class="absolute top-0 left-[calc(50%-950px-var(--rail-width)-var(--gap))] grid w-(--rail-width) grid-cols-[repeat(2,var(--rail-column))] gap-(--gap) opacity-50 [--rail-column:20rem] [--rail-width:calc(var(--rail-column)*2+var(--gap))]"
		>
			<div class="flex flex-col gap-(--gap)">
				<SkeletonContributionHistory></SkeletonContributionHistory>
				<SkeletonClaimableBalance></SkeletonClaimableBalance>
				<SkeletonDividendIncome></SkeletonDividendIncome>
				<SkeletonPayoutThreshold></SkeletonPayoutThreshold>
			</div>
			<div class="flex flex-col gap-(--gap)">
				<SkeletonUIElements></SkeletonUIElements>
				<SkeletonSavingsTargets></SkeletonSavingsTargets>
				<SkeletonNewMilestone></SkeletonNewMilestone>
				<SkeletonPayoutThreshold></SkeletonPayoutThreshold>
				<SkeletonAccountAccess></SkeletonAccountAccess>
			</div>
		</div>
		<div
			class="absolute top-0 right-[calc(50%-950px-var(--rail-width)-var(--gap))] grid w-(--rail-width) grid-cols-[repeat(2,var(--rail-column))] gap-(--gap) opacity-50 [--rail-column:20rem] [--rail-width:calc(var(--rail-column)*2+var(--gap))]"
		>
			<div class="flex flex-col gap-(--gap)">
				<SkeletonNewMilestone></SkeletonNewMilestone>
				<SkeletonPayoutThreshold></SkeletonPayoutThreshold>
				<SkeletonAccountAccess></SkeletonAccountAccess>
				<SkeletonQrConnect></SkeletonQrConnect>
				<SkeletonTransferFunds></SkeletonTransferFunds>
				<SkeletonPayments></SkeletonPayments>
				<SkeletonEmptyDistributeTrack></SkeletonEmptyDistributeTrack>
			</div>
			<div class="flex flex-col gap-(--gap)">
				<SkeletonQrConnect></SkeletonQrConnect>
				<SkeletonTransferFunds></SkeletonTransferFunds>
				<SkeletonPayments></SkeletonPayments>
				<SkeletonEmptyDistributeTrack></SkeletonEmptyDistributeTrack>
				<SkeletonAnalyticsCard></SkeletonAnalyticsCard>
				<SkeletonNotificationSettings></SkeletonNotificationSettings>
				<SkeletonPowerUsage></SkeletonPowerUsage>
			</div>
		</div>
	</div>
{/snippet}

<div
	data-slot="demo"
	class="theme-neutral bg-muted 3xl:[--gap:--spacing(8)] dark:bg-background relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden p-12 pb-0! [--gap:--spacing(8)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]! lg:p-6 lg:[--gap:--spacing(6)]"
>
	{@render CardsSkeletonRails()}
	<div
		class="relative z-10 mx-auto grid gap-(--gap) **:data-[slot=card]:w-full min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px]"
	>
		<div class="flex flex-col items-start gap-(--gap)">
			<UIElements></UIElements>
			<SidebarNav></SidebarNav>
			<SavingsTargets></SavingsTargets>
		</div>
		<div class="hidden flex-col gap-(--gap) lg:flex">
			<ContributionHistory></ContributionHistory>
			<ClaimableBalance></ClaimableBalance>
			<DividendIncome></DividendIncome>
		</div>
		<div class="3xl:flex! hidden flex-col gap-(--gap)">
			<NewMilestone></NewMilestone>
			<PayoutThreshold></PayoutThreshold>
			<AccountAccess></AccountAccess>
		</div>
		<div class="hidden flex-col gap-(--gap) md:flex">
			<QrConnect></QrConnect>
			<TransferFunds></TransferFunds>
			<Payments></Payments>
		</div>
		<div class="hidden flex-col gap-(--gap) min-[1400px]:flex">
			<EmptyDistributeTrack></EmptyDistributeTrack>
			<AnalyticsCard></AnalyticsCard>
			<NotificationSettings></NotificationSettings>
			<PowerUsage></PowerUsage>
		</div>
	</div>
	<div
		class="from-background via-muted absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b to-transparent dark:hidden"
	></div>
	<div
		class="from-background via-muted/80 dark:via-background/80 absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t to-transparent lg:h-80 xl:h-64"
	></div>
</div>
