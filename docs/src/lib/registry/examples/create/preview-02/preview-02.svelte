<script lang="ts">
	import AccountAccess from "./cards/account-access.svelte";
	import CardOverview from "./cards/card-overview.svelte";
	import ClaimableBalance from "./cards/claimable-balance.svelte";
	import ContributionHistory from "./cards/contribution-history.svelte";
	import CoverArt from "./cards/cover-art.svelte";
	import DividendIncome from "./cards/dividend-income.svelte";
	import EmptyConnectBank from "./cards/empty-connect-bank.svelte";
	import EmptyDistributeTrack from "./cards/empty-distribute-track.svelte";
	import EmptyExploreCatalog from "./cards/empty-explore-catalog.svelte";
	import Faq from "./cards/faq.svelte";
	import FrontDoor from "./cards/front-door.svelte";
	import IndexInvesting from "./cards/index-investing.svelte";
	import KitchenIsland from "./cards/kitchen-island.svelte";
	import LoadingCard from "./cards/loading-card.svelte";
	import NewMilestone from "./cards/new-milestone.svelte";
	import NotificationSettings from "./cards/notification-settings.svelte";
	import Payments from "./cards/payments.svelte";
	import PayoutThreshold from "./cards/payout-threshold.svelte";
	import PowerUsage from "./cards/power-usage.svelte";
	import Preferences from "./cards/preferences.svelte";
	import QrConnect from "./cards/qr-connect.svelte";
	import ReceivingMethod from "./cards/receiving-method.svelte";
	import RecentTransactions from "./cards/recent-transactions.svelte";
	import ReleaseCatalog from "./cards/release-catalog.svelte";
	import RollerShades from "./cards/roller-shades.svelte";
	import SavingsProgress from "./cards/savings-progress.svelte";
	import SavingsTargets from "./cards/savings-targets.svelte";
	import SidebarNav from "./cards/sidebar-nav.svelte";
	import SocialLinks from "./cards/social-links.svelte";
	import StockPerformance from "./cards/stock-performance.svelte";
	import SyncingState from "./cards/syncing-state.svelte";
	import TransferFunds from "./cards/transfer-funds.svelte";
	import UpcomingPayments from "./cards/upcoming-payments.svelte";
</script>

<div
	class="bg-muted dark:bg-background 3xl:[--gap:--spacing(12)] style-lyra:md:[--gap:--spacing(6)] style-mira:md:[--gap:--spacing(6)] overflow-x-auto overflow-y-hidden contain-[paint] [--gap:--spacing(4)] md:[--gap:--spacing(10)]"
>
	<div class="flex w-full min-w-max justify-center">
		<div
			class="bg-muted dark:bg-background style-lyra:md:w-[2600px] style-mira:md:w-[2600px] grid w-[2400px] grid-cols-7 items-start gap-(--gap) p-(--gap) md:w-[3000px] *:[div]:gap-(--gap)"
			data-slot="capture-target"
		>
			<div
				class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
			>
				<ContributionHistory />
				<EmptyDistributeTrack />
				<QrConnect />
				<DividendIncome />
				<IndexInvesting />
				<SyncingState />
			</div>
			<div
				class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
			>
				<PayoutThreshold />
				<ClaimableBalance />
				<Preferences />
				<SavingsProgress />
				<KitchenIsland />
			</div>
			<div
				class="col-span-2 flex flex-col p-1 [contain-intrinsic-size:760px_1200px] [content-visibility:auto]"
			>
				<SavingsTargets />
				<RecentTransactions />
				<div class="grid grid-cols-2 items-start gap-(--gap)">
					<div class="flex flex-col gap-(--gap)">
						<SidebarNav />
						<Faq />
					</div>
					<div class="flex flex-col gap-(--gap)">
						<Payments />
						<FrontDoor />
					</div>
				</div>
				<ReleaseCatalog />
			</div>
			<div
				class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
			>
				<AccountAccess />
				<CardOverview />
				<TransferFunds />
				<CoverArt />
				<LoadingCard />
			</div>
			<div
				class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
			>
				<ReceivingMethod />
				<PowerUsage />
				<EmptyConnectBank />
				<UpcomingPayments />
				<RollerShades />
			</div>
			<div
				class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
			>
				<StockPerformance />
				<EmptyExploreCatalog />
				<NewMilestone />
				<SocialLinks />
				<NotificationSettings />
			</div>
		</div>
	</div>
</div>
