<script lang="ts">
	import QuestionnaireCard from "./questionnaire-card.svelte";
	import QuestionnaireDialog from "./questionnaire-dialog.svelte";
	import QuestionnaireDisabled from "./questionnaire-disabled.svelte";
	import QuestionnaireNoDescription from "./questionnaire-no-description.svelte";
	import QuestionnaireStandalone from "./questionnaire-standalone.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<QuestionnaireStandalone />
	<QuestionnaireCard />
	<QuestionnaireDialog />
	<QuestionnaireNoDescription />
	<QuestionnaireDisabled />
</ExampleWrapper>
