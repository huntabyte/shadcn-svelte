<script lang="ts">
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import QuestionnaireNavigation from "./questionnaire-navigation.svelte";
	import QuestionnaireQuestions from "./questionnaire-questions.svelte";
	import { questionnaireItems, handleSubmit } from "./questionnaire-data.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Dialog" class="items-center justify-center" containerClass="md:col-span-2">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Open questionnaire</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Questionnaire.Root
				defaultItem="direction"
				items={questionnaireItems}
				onSubmit={handleSubmit}
			>
				<Dialog.Header>
					<Dialog.Title class="sr-only">Plan an agent interface</Dialog.Title>
					<Dialog.Description class="sr-only">
						Answer three questions to shape the next prototype.
					</Dialog.Description>
					<Questionnaire.Progress class="font-semibold tracking-widest text-foreground uppercase">
						{#snippet child({ props, current, total })}
							<span {...props}>
								Question {current} of {total}
							</span>
						{/snippet}
					</Questionnaire.Progress>
				</Dialog.Header>
				<QuestionnaireQuestions />
				<Dialog.Footer>
					<QuestionnaireNavigation />
				</Dialog.Footer>
			</Questionnaire.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
