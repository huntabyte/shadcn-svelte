<script lang="ts">
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import QuestionnaireNavigation from "./questionnaire-navigation.svelte";
	import QuestionnaireQuestions from "./questionnaire-questions.svelte";
	import { questionnaireItems, handleSubmit } from "./questionnaire-data.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Standalone" containerClass="md:col-span-2">
	<Questionnaire.Root
		class="mx-auto max-w-lg"
		defaultItem="direction"
		items={questionnaireItems}
		shortcuts="letters"
		onSubmit={handleSubmit}
	>
		<Questionnaire.Progress />
		<QuestionnaireQuestions />
		<QuestionnaireNavigation />
	</Questionnaire.Root>
</Example>
