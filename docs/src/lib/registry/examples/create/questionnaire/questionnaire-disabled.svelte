<script lang="ts">
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import QuestionnaireNavigation from "./questionnaire-navigation.svelte";
	import { handleSubmit, planItems } from "./questionnaire-data.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Disabled" containerClass="md:col-span-2">
	<Questionnaire.Root
		class="mx-auto max-w-lg"
		defaultItem="plan"
		items={planItems}
		onSubmit={handleSubmit}
	>
		<Questionnaire.Item name="plan" required>
			<Questionnaire.Title>Choose a plan</Questionnaire.Title>
			<Questionnaire.Description
				>Enterprise is not available on your account.</Questionnaire.Description
			>
			<Questionnaire.Choices>
				<Questionnaire.Choice value="plus">
					<span class="font-medium">Plus</span>
					<Questionnaire.ChoiceDescription>
						For individuals and small teams
					</Questionnaire.ChoiceDescription>
				</Questionnaire.Choice>
				<Questionnaire.Choice value="pro">
					<span class="font-medium">Pro</span>
					<Questionnaire.ChoiceDescription>For growing businesses</Questionnaire.ChoiceDescription>
				</Questionnaire.Choice>
				<Questionnaire.Choice value="enterprise" disabled>
					<span class="font-medium">Enterprise</span>
					<Questionnaire.ChoiceDescription>
						For large teams and enterprises
					</Questionnaire.ChoiceDescription>
				</Questionnaire.Choice>
			</Questionnaire.Choices>
			<Questionnaire.Error />
		</Questionnaire.Item>
		<QuestionnaireNavigation />
	</Questionnaire.Root>
</Example>
