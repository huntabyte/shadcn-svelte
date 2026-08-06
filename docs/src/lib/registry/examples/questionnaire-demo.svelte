<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import ExampleWrapper from "../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import Example from "../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const questionnaireItems = [
		{ name: "direction", required: true },
		{ name: "signals" },
		{ name: "timing", required: true },
	];
	const taskItems = [{ name: "task", required: true }];

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
	}
</script>

<ExampleWrapper>
	<Example title="Standalone" containerClass="md:col-span-2">
		<Questionnaire.Root
			class="mx-auto max-w-lg"
			defaultItem="direction"
			items={questionnaireItems}
			shortcuts="letters"
			onsubmit={handleSubmit}
		>
			<Questionnaire.Progress />
			<Questionnaire.Item name="direction" required>
				<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
				<Questionnaire.Description
					>Choose one direction or write another answer.</Questionnaire.Description
				>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="delegation">
						<span class="font-medium">Sub-agent delegation</span>
						<span class="text-muted-foreground"
							>Show when work is delegated and what comes back.</span
						>
					</Questionnaire.Choice>
					<Questionnaire.Choice value="questions">
						<span class="font-medium">Question prompts</span>
						<span class="text-muted-foreground">Show choices while the agent waits for input.</span>
					</Questionnaire.Choice>
					<Questionnaire.Choice value="both">
						<span class="font-medium">Both together</span>
						<span class="text-muted-foreground">Explore one unified interaction pattern.</span>
					</Questionnaire.Choice>
					<Questionnaire.Input
						aria-label="Another direction"
						placeholder="Type another direction…"
					/>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Questionnaire.Item>
			<Questionnaire.Item name="signals" multiple>
				<Questionnaire.Title>What should every progress update include?</Questionnaire.Title>
				<Questionnaire.Description
					>Select all that apply, or skip this question.</Questionnaire.Description
				>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="progress">Progress</Questionnaire.Choice>
					<Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice>
					<Questionnaire.Choice value="risks">Risks</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Questionnaire.Item>
			<Questionnaire.Item name="timing" required>
				<Questionnaire.Title>When should this be revisited?</Questionnaire.Title>
				<Questionnaire.Description>Choose when this should be revisited.</Questionnaire.Description>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="week">This week</Questionnaire.Choice>
					<Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice>
					<Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Questionnaire.Item>
			<Questionnaire.Actions class="w-full">
				<Questionnaire.Previous />
				<Questionnaire.Skip />
				<Questionnaire.Next>Next</Questionnaire.Next>
				<Questionnaire.Submit>Save answers</Questionnaire.Submit>
			</Questionnaire.Actions>
		</Questionnaire.Root>
	</Example>

	<Example title="Card" containerClass="md:col-span-2">
		<Questionnaire.Root
			defaultItem="direction"
			items={questionnaireItems}
			shortcuts="numbers"
			onsubmit={handleSubmit}
		>
			<Questionnaire.Item name="direction" required>
				<Card.Root class="mx-auto w-full max-w-lg">
					<Card.Header>
						<Card.Title
							data-slot="questionnaire-title"
							class="cn-questionnaire-title cn-font-heading text-pretty"
							>What should we prototype next?</Card.Title
						>
						<Card.Description
							data-slot="questionnaire-description"
							class="cn-questionnaire-description text-pretty text-muted-foreground"
							>Choose one direction or write another answer.</Card.Description
						>
						<Card.Action><Questionnaire.Progress /></Card.Action>
					</Card.Header>
					<Card.Content>
						<Questionnaire.Choices>
							<Questionnaire.Choice value="delegation">
								<span class="font-medium">Sub-agent delegation</span>
								<span class="text-muted-foreground"
									>Show when work is delegated and what comes back.</span
								>
							</Questionnaire.Choice>
							<Questionnaire.Choice value="questions">
								<span class="font-medium">Question prompts</span>
								<span class="text-muted-foreground"
									>Show choices while the agent waits for input.</span
								>
							</Questionnaire.Choice>
							<Questionnaire.Choice value="both">
								<span class="font-medium">Both together</span>
								<span class="text-muted-foreground">Explore one unified interaction pattern.</span>
							</Questionnaire.Choice>
							<Questionnaire.Input
								aria-label="Another direction"
								placeholder="Type another direction…"
							/>
						</Questionnaire.Choices>
						<Questionnaire.Error />
					</Card.Content>
					<Card.Footer>{@render QuestionnaireNavigation()}</Card.Footer>
				</Card.Root>
			</Questionnaire.Item>
			<Questionnaire.Item name="signals" multiple>
				{@render QuestionnaireCard(
					"What should every progress update include?",
					"Select all that apply, or skip this question.",
					signalsChoices
				)}
			</Questionnaire.Item>
			<Questionnaire.Item name="timing" required>
				{@render QuestionnaireCard(
					"When should this be revisited?",
					"Choose when this should be revisited.",
					timingChoices
				)}
			</Questionnaire.Item>
		</Questionnaire.Root>
	</Example>

	<Example title="Dialog" class="items-center justify-center" containerClass="md:col-span-2">
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
				>Open questionnaire</Dialog.Trigger
			>
			<Dialog.Content>
				<Questionnaire.Root
					defaultItem="direction"
					items={questionnaireItems}
					onsubmit={handleSubmit}
				>
					<Dialog.Header>
						<Dialog.Title class="sr-only">Plan an agent interface</Dialog.Title>
						<Dialog.Description class="sr-only"
							>Answer three questions to shape the next prototype.</Dialog.Description
						>
						<Questionnaire.Progress
							class="font-semibold tracking-widest text-foreground uppercase"
						/>
					</Dialog.Header>
					{@render QuestionnaireQuestions()}
					<Dialog.Footer>{@render QuestionnaireNavigation()}</Dialog.Footer>
				</Questionnaire.Root>
			</Dialog.Content>
		</Dialog.Root>
	</Example>

	<Example title="No description" containerClass="md:col-span-2">
		<Questionnaire.Root
			class="mx-auto max-w-lg"
			defaultItem="task"
			items={taskItems}
			shortcuts="letters"
			onsubmit={handleSubmit}
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
			{@render QuestionnaireNavigation()}
		</Questionnaire.Root>
	</Example>
</ExampleWrapper>

{#snippet QuestionnaireNavigation()}
	<Questionnaire.Actions class="w-full">
		<Questionnaire.Previous />
		<Questionnaire.Skip />
		<Questionnaire.Next>Next</Questionnaire.Next>
		<Questionnaire.Submit>Save answers</Questionnaire.Submit>
	</Questionnaire.Actions>
{/snippet}

{#snippet QuestionnaireQuestions()}
	<Questionnaire.Item name="direction" required>
		<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
		<Questionnaire.Description
			>Choose one direction or write another answer.</Questionnaire.Description
		>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="delegation"
				><span class="font-medium">Sub-agent delegation</span><span class="text-muted-foreground"
					>Show when work is delegated and what comes back.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Choice value="questions"
				><span class="font-medium">Question prompts</span><span class="text-muted-foreground"
					>Show choices while the agent waits for input.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Choice value="both"
				><span class="font-medium">Both together</span><span class="text-muted-foreground"
					>Explore one unified interaction pattern.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Input aria-label="Another direction" placeholder="Type another direction…" />
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Item name="signals" multiple>
		<Questionnaire.Title>What should every progress update include?</Questionnaire.Title>
		<Questionnaire.Description
			>Select all that apply, or skip this question.</Questionnaire.Description
		>
		<Questionnaire.Choices
			><Questionnaire.Choice value="progress">Progress</Questionnaire.Choice><Questionnaire.Choice
				value="decisions">Decisions</Questionnaire.Choice
			><Questionnaire.Choice value="risks">Risks</Questionnaire.Choice></Questionnaire.Choices
		>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Item name="timing" required>
		<Questionnaire.Title>When should this be revisited?</Questionnaire.Title>
		<Questionnaire.Description>Choose when this should be revisited.</Questionnaire.Description>
		<Questionnaire.Choices
			><Questionnaire.Choice value="week">This week</Questionnaire.Choice><Questionnaire.Choice
				value="cycle">Next cycle</Questionnaire.Choice
			><Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice
			></Questionnaire.Choices
		>
		<Questionnaire.Error />
	</Questionnaire.Item>
{/snippet}

{#snippet signalsChoices()}
	<Questionnaire.Choices>
		<Questionnaire.Choice value="progress">Progress</Questionnaire.Choice>
		<Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice>
		<Questionnaire.Choice value="risks">Risks</Questionnaire.Choice>
	</Questionnaire.Choices>
	<Questionnaire.Error />
{/snippet}

{#snippet timingChoices()}
	<Questionnaire.Choices>
		<Questionnaire.Choice value="week">This week</Questionnaire.Choice>
		<Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice>
		<Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice>
	</Questionnaire.Choices>
	<Questionnaire.Error />
{/snippet}

{#snippet QuestionnaireCard(title: string, description: string, content: import("svelte").Snippet)}
	<Card.Root class="mx-auto w-full max-w-lg">
		<Card.Header>
			<Card.Title
				data-slot="questionnaire-title"
				class="cn-questionnaire-title cn-font-heading text-pretty">{title}</Card.Title
			>
			<Card.Description
				data-slot="questionnaire-description"
				class="cn-questionnaire-description text-pretty text-muted-foreground"
				>{description}</Card.Description
			>
			<Card.Action><Questionnaire.Progress /></Card.Action>
		</Card.Header>
		<Card.Content>{@render content()}</Card.Content>
		<Card.Footer>{@render QuestionnaireNavigation()}</Card.Footer>
	</Card.Root>
{/snippet}
