<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	const items = [
		{ name: "direction", required: true },
		{ name: "signals" },
		{ name: "timing", required: true },
	];
	const taskItems = [{ name: "task", required: true }];

	function submit(event: SubmitEvent) {
		event.preventDefault();
	}
</script>

<div class="grid w-full gap-6 md:grid-cols-2">
	<div class="md:col-span-2">
		<p class="mb-4 text-sm font-medium">Standalone</p>
		<Questionnaire.Root
			{items}
			defaultItem="direction"
			shortcuts="letters"
			onsubmit={submit}
			class="mx-auto max-w-lg"
		>
			<Questionnaire.Progress />
			<Questionnaire.Item name="direction" required>
				<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
				<Questionnaire.Description
					>Choose one direction or write another answer.</Questionnaire.Description
				>
				<Questionnaire.Choices>
					<Questionnaire.Choice
						value="delegation"
						label="Sub-agent delegation"
						description="Show when work is delegated and what comes back."
						shortcut="A"
					/>
					<Questionnaire.Choice
						value="questions"
						label="Question prompts"
						description="Show choices while the agent waits for input."
						shortcut="B"
					/>
					<Questionnaire.Choice
						value="both"
						label="Both together"
						description="Explore one unified interaction pattern."
						shortcut="C"
					/>
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
			</Questionnaire.Item>
			<Questionnaire.Item name="timing" required>
				<Questionnaire.Title>When should this be revisited?</Questionnaire.Title>
				<Questionnaire.Description>Choose when this should be revisited.</Questionnaire.Description>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="week">This week</Questionnaire.Choice>
					<Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice>
					<Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice>
				</Questionnaire.Choices>
			</Questionnaire.Item>
			<Questionnaire.Actions>
				<Questionnaire.Previous />
				<Questionnaire.Skip />
				<Questionnaire.Next>Next</Questionnaire.Next>
				<Questionnaire.Submit>Save answers</Questionnaire.Submit>
			</Questionnaire.Actions>
		</Questionnaire.Root>
	</div>

	<div class="md:col-span-2">
		<p class="mb-4 text-sm font-medium">Card</p>
		<Questionnaire.Root {items} defaultItem="direction" shortcuts="numbers" onsubmit={submit}>
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
							<Questionnaire.Choice value="delegation"
								><span class="font-medium">Sub-agent delegation</span><span
									class="text-muted-foreground"
									>Show when work is delegated and what comes back.</span
								></Questionnaire.Choice
							>
							<Questionnaire.Choice value="questions"
								><span class="font-medium">Question prompts</span><span
									class="text-muted-foreground">Show choices while the agent waits for input.</span
								></Questionnaire.Choice
							>
							<Questionnaire.Choice value="both"
								><span class="font-medium">Both together</span><span class="text-muted-foreground"
									>Explore one unified interaction pattern.</span
								></Questionnaire.Choice
							>
							<Questionnaire.Input
								aria-label="Another direction"
								placeholder="Type another direction…"
							/>
						</Questionnaire.Choices>
						<Questionnaire.Error />
					</Card.Content>
					<Card.Footer
						><Questionnaire.Actions
							><Questionnaire.Previous /><Questionnaire.Skip /><Questionnaire.Next
							/><Questionnaire.Submit>Save answers</Questionnaire.Submit></Questionnaire.Actions
						></Card.Footer
					>
				</Card.Root>
			</Questionnaire.Item>
			<Questionnaire.Item name="signals" multiple>
				<Card.Root class="mx-auto w-full max-w-lg">
					<Card.Header>
						<Card.Title
							data-slot="questionnaire-title"
							class="cn-questionnaire-title cn-font-heading text-pretty"
							>What should every progress update include?</Card.Title
						>
						<Card.Description
							data-slot="questionnaire-description"
							class="cn-questionnaire-description text-pretty text-muted-foreground"
							>Select all that apply, or skip this question.</Card.Description
						>
						<Card.Action><Questionnaire.Progress /></Card.Action>
					</Card.Header>
					<Card.Content>
						<Questionnaire.Choices
							><Questionnaire.Choice value="progress">Progress</Questionnaire.Choice
							><Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice
							><Questionnaire.Choice value="risks">Risks</Questionnaire.Choice
							></Questionnaire.Choices
						>
						<Questionnaire.Error />
					</Card.Content>
					<Card.Footer
						><Questionnaire.Actions
							><Questionnaire.Previous /><Questionnaire.Skip /><Questionnaire.Next
							/><Questionnaire.Submit>Save answers</Questionnaire.Submit></Questionnaire.Actions
						></Card.Footer
					>
				</Card.Root>
			</Questionnaire.Item>
			<Questionnaire.Item name="timing" required>
				<Card.Root class="mx-auto w-full max-w-lg">
					<Card.Header>
						<Card.Title
							data-slot="questionnaire-title"
							class="cn-questionnaire-title cn-font-heading text-pretty"
							>When should this be revisited?</Card.Title
						>
						<Card.Description
							data-slot="questionnaire-description"
							class="cn-questionnaire-description text-pretty text-muted-foreground"
							>Choose when this should be revisited.</Card.Description
						>
						<Card.Action><Questionnaire.Progress /></Card.Action>
					</Card.Header>
					<Card.Content
						><Questionnaire.Choices
							><Questionnaire.Choice value="week">This week</Questionnaire.Choice
							><Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice
							><Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice
							></Questionnaire.Choices
						><Questionnaire.Error /></Card.Content
					>
					<Card.Footer
						><Questionnaire.Actions
							><Questionnaire.Previous /><Questionnaire.Skip /><Questionnaire.Next
							/><Questionnaire.Submit>Save answers</Questionnaire.Submit></Questionnaire.Actions
						></Card.Footer
					>
				</Card.Root>
			</Questionnaire.Item>
		</Questionnaire.Root>
	</div>

	<div class="flex items-center justify-center md:col-span-2">
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
				>Open questionnaire</Dialog.Trigger
			>
			<Dialog.Content>
				<Questionnaire.Root {items} defaultItem="direction" onsubmit={submit}>
					<Dialog.Header>
						<Dialog.Title class="sr-only">Plan an agent interface</Dialog.Title>
						<Dialog.Description class="sr-only"
							>Answer three questions to shape the next prototype.</Dialog.Description
						>
						<Questionnaire.Progress />
					</Dialog.Header>
					<Questionnaire.Item name="direction" required>
						<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
						<Questionnaire.Description
							>Choose one direction or write another answer.</Questionnaire.Description
						>
						<Questionnaire.Choices
							><Questionnaire.Choice value="delegation">Sub-agent delegation</Questionnaire.Choice
							><Questionnaire.Choice value="questions">Question prompts</Questionnaire.Choice
							><Questionnaire.Choice value="both">Both together</Questionnaire.Choice
							></Questionnaire.Choices
						>
					</Questionnaire.Item>
					<Questionnaire.Item name="signals" multiple>
						<Questionnaire.Title>What should every progress update include?</Questionnaire.Title>
						<Questionnaire.Description
							>Select all that apply, or skip this question.</Questionnaire.Description
						>
						<Questionnaire.Choices
							><Questionnaire.Choice value="progress">Progress</Questionnaire.Choice
							><Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice
							><Questionnaire.Choice value="risks">Risks</Questionnaire.Choice
							></Questionnaire.Choices
						>
					</Questionnaire.Item>
					<Questionnaire.Item name="timing" required>
						<Questionnaire.Title>When should this be revisited?</Questionnaire.Title>
						<Questionnaire.Description
							>Choose when this should be revisited.</Questionnaire.Description
						>
						<Questionnaire.Choices
							><Questionnaire.Choice value="week">This week</Questionnaire.Choice
							><Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice
							><Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice
							></Questionnaire.Choices
						>
					</Questionnaire.Item>
					<Dialog.Footer
						><Questionnaire.Actions
							><Questionnaire.Previous /><Questionnaire.Skip /><Questionnaire.Next
							/><Questionnaire.Submit>Save answers</Questionnaire.Submit></Questionnaire.Actions
						></Dialog.Footer
					>
				</Questionnaire.Root>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<div class="md:col-span-2">
		<p class="mb-4 text-sm font-medium">No description</p>
		<Questionnaire.Root
			items={taskItems}
			defaultItem="task"
			shortcuts="letters"
			onsubmit={submit}
			class="mx-auto max-w-lg"
		>
			<Questionnaire.Progress />
			<Questionnaire.Item name="task" required>
				<Questionnaire.Title>What should the agent do next?</Questionnaire.Title>
				<Questionnaire.Choices
					><Questionnaire.Choice value="inspect" shortcut="A"
						>Inspect the codebase</Questionnaire.Choice
					><Questionnaire.Choice value="implement" shortcut="B"
						>Implement the change</Questionnaire.Choice
					><Questionnaire.Choice value="review" shortcut="C">Review the result</Questionnaire.Choice
					></Questionnaire.Choices
				>
				<Questionnaire.Error />
			</Questionnaire.Item>
			<Questionnaire.Actions
				><Questionnaire.Previous /><Questionnaire.Skip /><Questionnaire.Next /><Questionnaire.Submit
					>Save answers</Questionnaire.Submit
				></Questionnaire.Actions
			>
		</Questionnaire.Root>
	</div>
</div>
