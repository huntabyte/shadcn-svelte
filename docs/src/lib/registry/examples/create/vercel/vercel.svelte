<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import DeploymentFilter from "./deployment-filter.svelte";
	import UsageCard from "./usage-card.svelte";
	import ObservabilityCard from "./observability-card.svelte";
	import BillingList from "./billing-list.svelte";
	import AnomalyAlert from "./anomaly-alert.svelte";
	import ActivateAgentDialog from "./activate-agent-dialog.svelte";
	import FeedbackForm from "./feedback-form.svelte";
	import AnalyticsCard from "./analytics-card.svelte";
</script>

<ExampleWrapper>
	<DeploymentFilter />
	<UsageCard />
	<ObservabilityCard />
	<BillingList />
	<AnomalyAlert />
	<ActivateAgentDialog />
	<FeedbackForm />
	<AnalyticsCard />
</ExampleWrapper>
