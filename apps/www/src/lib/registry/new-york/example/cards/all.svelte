<script lang="ts">
	import {
		CardsActivityGoal,
		CardsMetric,
		CardsCookieSettings,
		CardsPaymentMethod,
		CardsCreateAccount,
		CardsCalendar,
		CardsDataTable,
		CardsReportIssue,
		CardsShare,
		CardsStats
	} from ".";
</script>

<div
	class="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4"
>
	<div class="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
		<CardsStats />
		<div class="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
			<CardsCalendar />
			<div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
				<CardsActivityGoal />
			</div>
			<div class="pt-3 sm:col-span-2 xl:pt-4">
				<CardsMetric />
			</div>
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
			<div class="space-y-4 xl:space-y-4">
				<!-- <CardsTeamMembers /> -->
				<CardsCookieSettings />
				<CardsPaymentMethod />
			</div>
			<div class="space-y-4 xl:space-y-4">
				<!-- <CardsChat /> -->
				<CardsCreateAccount />
				<div class="hidden xl:block">
					<CardsReportIssue />
				</div>
			</div>
		</div>
	</div>
	<div class="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
		<div class="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
			<CardsCalendar />
			<div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
				<CardsActivityGoal />
			</div>
			<div class="pt-3 sm:col-span-2 xl:pt-3">
				<CardsMetric />
			</div>
		</div>
		<div class="hidden md:block">
			<CardsDataTable />
		</div>
		<CardsShare />
		<div class="xl:hidden">
			<CardsReportIssue />
		</div>
	</div>
</div>
