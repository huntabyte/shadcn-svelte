<script lang="ts">
	import ActivateAgentDialog from "./activate-agent-dialog.svelte";
	import AnalyticsCard from "./analytics-card.svelte";
	import AnomalyAlert from "./anomaly-alert.svelte";
	import BillingList from "./billing-list.svelte";
	import DeploymentFilter from "./deployment-filter.svelte";
	import FeedbackForm from "./feedback-form.svelte";
	import ObservabilityCard from "./observability-card.svelte";
	import UsageCard from "./usage-card.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/create/components/example-wrapper.svelte";
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
