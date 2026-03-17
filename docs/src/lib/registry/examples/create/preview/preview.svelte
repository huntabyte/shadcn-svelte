<script lang="ts">
	import ActivateAgentDialog from "./cards/activate-agent-dialog.svelte";
	import AnalyticsCard from "./cards/analytics-card.svelte";
	import AnomalyAlert from "./cards/anomaly-alert.svelte";
	import AssignIssue from "./cards/assign-issue.svelte";
	import BarChartCard from "./cards/bar-chart-card.svelte";
	import BarVisualizerCard from "./cards/bar-visualizer-card.svelte";
	import BookAppointment from "./cards/book-appointment.svelte";
	import CodespacesCard from "./cards/codespaces-card.svelte";
	import ContributionsActivity from "./cards/contributions-activity.svelte";
	import Contributors from "./cards/contributors.svelte";
	import EnvironmentVariables from "./cards/environment-variables.svelte";
	import FeedbackForm from "./cards/feedback-form.svelte";
	import FileUpload from "./cards/file-upload.svelte";
	import GithubProfile from "./cards/github-profile.svelte";
	import IconPreviewGrid from "./cards/icon-preview-grid.svelte";
	import InviteTeam from "./cards/invite-team.svelte";
	import Invoice from "./cards/invoice.svelte";
	import LiveWaveformCard from "./cards/live-waveform.svelte";
	import NoTeamMembers from "./cards/no-team-members.svelte";
	import NotFound from "./cards/not-found.svelte";
	import ObservabilityCard from "./cards/observability-card.svelte";
	import PieChartCard from "./cards/pie-chart-card.svelte";
	import ReportBug from "./cards/report-bug.svelte";
	import ShippingAddress from "./cards/shipping-address.svelte";
	import Shortcuts from "./cards/shortcuts.svelte";
	import SkeletonLoading from "./cards/skeleton-loading.svelte";
	import SleepReport from "./cards/sleep-report.svelte";
	import StyleOverview from "./cards/style-overview.svelte";
	import UIElements from "./cards/ui-elements.svelte";
	import UsageCard from "./cards/usage-card.svelte";
	import Visitors from "./cards/visitors.svelte";
	import WeeklyFitnessSummary from "./cards/weekly-fitness-summary.svelte";
</script>

<div
	class="3xl:[--gap:--spacing(12)] overflow-x-auto overflow-y-hidden contain-[paint] [--gap:--spacing(4)] md:[--gap:--spacing(10)]"
>
	<div
		class="bg-muted dark:bg-background grid w-[2400px] grid-cols-7 items-start gap-(--gap) p-(--gap) md:w-[3000px] *:[div]:gap-(--gap)"
		data-slot="capture-target"
	>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<StyleOverview />
			<div class="md:hidden">
				<UIElements />
			</div>
			<CodespacesCard />
			<BarVisualizerCard />
			<Invoice />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<IconPreviewGrid />
			<div class="hidden w-full md:flex">
				<UIElements />
			</div>
			<ObservabilityCard />
			<Visitors />
			<Shortcuts />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<EnvironmentVariables />
			<BarChartCard />
			<InviteTeam />
			<ActivateAgentDialog />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<SkeletonLoading />
			<PieChartCard />
			<NoTeamMembers />
			<ReportBug />
			<Contributors />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<FeedbackForm />
			<BookAppointment />
			<SleepReport />
			<GithubProfile />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<AssignIssue />
			<WeeklyFitnessSummary />
			<FileUpload />
			<AnalyticsCard />
			<UsageCard />
			<ContributionsActivity />
		</div>
		<div
			class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]"
		>
			<AnomalyAlert />
			<LiveWaveformCard />
			<ShippingAddress />
			<NotFound />
		</div>
	</div>
</div>
