<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import QuestionnaireNavigation from "./questionnaire-navigation.svelte";
	import { questionnaireItems, handleSubmit } from "./questionnaire-data.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const uid = $props.id();
	const directionTitleId = `${uid}-direction`;
	const signalsTitleId = `${uid}-signals`;
	const timingTitleId = `${uid}-timing`;
</script>

<Example title="Card" containerClass="md:col-span-2">
	<Questionnaire.Root
		defaultItem="direction"
		items={questionnaireItems}
		shortcuts="numbers"
		onSubmit={handleSubmit}
	>
		<Questionnaire.Item aria-labelledby={directionTitleId} name="direction" required>
			<Card.Root class="mx-auto w-full max-w-lg">
				<Card.Header>
					<Questionnaire.Title id={directionTitleId}>
						{#snippet child({ props })}
							<Card.Title {...props}>What should we prototype next?</Card.Title>
						{/snippet}
					</Questionnaire.Title>
					<Questionnaire.Description>
						{#snippet child({ props })}
							<Card.Description {...props}>
								Choose one direction or write another answer.
							</Card.Description>
						{/snippet}
					</Questionnaire.Description>
					<Card.Action>
						<Questionnaire.Progress />
					</Card.Action>
				</Card.Header>
				<Card.Content>
					<Questionnaire.Choices>
						<Questionnaire.Choice value="delegation">
							<span class="font-medium">Sub-agent delegation</span>
							<Questionnaire.ChoiceDescription>
								Show when work is delegated and what comes back.
							</Questionnaire.ChoiceDescription>
						</Questionnaire.Choice>
						<Questionnaire.Choice value="questions">
							<span class="font-medium">Question prompts</span>
							<Questionnaire.ChoiceDescription>
								Show choices while the agent waits for input.
							</Questionnaire.ChoiceDescription>
						</Questionnaire.Choice>
						<Questionnaire.Choice value="both">
							<span class="font-medium">Both together</span>
							<Questionnaire.ChoiceDescription>
								Explore one unified interaction pattern.
							</Questionnaire.ChoiceDescription>
						</Questionnaire.Choice>
						<Questionnaire.Input
							aria-label="Another direction"
							placeholder="Type another direction…"
						/>
					</Questionnaire.Choices>
					<Questionnaire.Error />
				</Card.Content>
				<Card.Footer>
					<QuestionnaireNavigation />
				</Card.Footer>
			</Card.Root>
		</Questionnaire.Item>
		<Questionnaire.Item aria-labelledby={signalsTitleId} name="signals" multiple>
			<Card.Root class="mx-auto w-full max-w-lg">
				<Card.Header>
					<Questionnaire.Title id={signalsTitleId}>
						{#snippet child({ props })}
							<Card.Title {...props}>What should every progress update include?</Card.Title>
						{/snippet}
					</Questionnaire.Title>
					<Questionnaire.Description>
						{#snippet child({ props })}
							<Card.Description {...props}>
								Select all that apply, or skip this question.
							</Card.Description>
						{/snippet}
					</Questionnaire.Description>
					<Card.Action>
						<Questionnaire.Progress />
					</Card.Action>
				</Card.Header>
				<Card.Content>
					<Questionnaire.Choices>
						<Questionnaire.Choice value="progress">Progress</Questionnaire.Choice>
						<Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice>
						<Questionnaire.Choice value="risks">Risks</Questionnaire.Choice>
					</Questionnaire.Choices>
					<Questionnaire.Error />
				</Card.Content>
				<Card.Footer>
					<QuestionnaireNavigation />
				</Card.Footer>
			</Card.Root>
		</Questionnaire.Item>
		<Questionnaire.Item aria-labelledby={timingTitleId} name="timing" required>
			<Card.Root class="mx-auto w-full max-w-lg">
				<Card.Header>
					<Questionnaire.Title id={timingTitleId}>
						{#snippet child({ props })}
							<Card.Title {...props}>When should this be revisited?</Card.Title>
						{/snippet}
					</Questionnaire.Title>
					<Questionnaire.Description>
						{#snippet child({ props })}
							<Card.Description {...props}>Choose when this should be revisited.</Card.Description>
						{/snippet}
					</Questionnaire.Description>
					<Card.Action>
						<Questionnaire.Progress />
					</Card.Action>
				</Card.Header>
				<Card.Content>
					<Questionnaire.Choices>
						<Questionnaire.Choice value="week">This week</Questionnaire.Choice>
						<Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice>
						<Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice>
					</Questionnaire.Choices>
					<Questionnaire.Error />
				</Card.Content>
				<Card.Footer>
					<QuestionnaireNavigation />
				</Card.Footer>
			</Card.Root>
		</Questionnaire.Item>
	</Questionnaire.Root>
</Example>
