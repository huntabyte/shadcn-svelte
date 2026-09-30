<script lang="ts">
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import QuestionnaireNavigation from "./questionnaire-navigation.svelte";
	import { handleSubmit, taskItems } from "./questionnaire-data.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="No description" containerClass="md:col-span-2">
	<Questionnaire.Root
		class="mx-auto max-w-lg"
		defaultItem="task"
		items={taskItems}
		shortcuts="letters"
		onSubmit={handleSubmit}
	>
		<Questionnaire.Progress />
		<Questionnaire.Item name="task" required>
			<Questionnaire.Title>What should the agent do next?</Questionnaire.Title>
			<Questionnaire.Choices>
				<Questionnaire.Choice value="inspect">Inspect the codebase</Questionnaire.Choice>
				<Questionnaire.Choice value="implement">Implement the change</Questionnaire.Choice>
				<Questionnaire.Choice value="review">Review the result</Questionnaire.Choice>
			</Questionnaire.Choices>
			<Questionnaire.Error />
		</Questionnaire.Item>
		<QuestionnaireNavigation />
	</Questionnaire.Root>
</Example>
