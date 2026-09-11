<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{
			choices: [{ value: "fix" }, { value: "refactor" }, { value: "docs" }],
			name: "task",
			required: true,
		},
		{
			choices: [{ value: "summary" }, { value: "files" }, { value: "review" }],
			name: "output",
			required: true,
		},
	] as const;

	const uid = $props.id();
	const taskTitleId = `${uid}-task`;
	const outputTitleId = `${uid}-output`;

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent task created", {
			description: `Task: ${formData.get("task") ?? "None"} · Handoff: ${formData.get("output") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root
	class="mx-auto max-w-md"
	defaultItem="task"
	{items}
	shortcuts="numbers"
	onSubmit={handleSubmit}
>
	<Card.Root>
		<Questionnaire.Item aria-labelledby={taskTitleId} name="task" required>
			<Card.Header>
				<Questionnaire.Title id={taskTitleId}>
					{#snippet child({ props })}
						<Card.Title {...props}>What should the agent work on?</Card.Title>
					{/snippet}
				</Questionnaire.Title>
				<Questionnaire.Description>
					{#snippet child({ props })}
						<Card.Description {...props}>Choose the task that should be handled next.</Card.Description>
					{/snippet}
				</Questionnaire.Description>
				<Card.Action>
					<Questionnaire.Progress />
				</Card.Action>
			</Card.Header>
			<Card.Content>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="fix">Fix the failing tests</Questionnaire.Choice>
					<Questionnaire.Choice value="refactor">Refactor the data layer</Questionnaire.Choice>
					<Questionnaire.Choice value="docs">Update the integration guide</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Card.Content>
		</Questionnaire.Item>

		<Questionnaire.Item aria-labelledby={outputTitleId} name="output" required>
			<Card.Header>
				<Questionnaire.Title id={outputTitleId}>
					{#snippet child({ props })}
						<Card.Title {...props}>What should the final handoff include?</Card.Title>
					{/snippet}
				</Questionnaire.Title>
				<Questionnaire.Description>
					{#snippet child({ props })}
						<Card.Description {...props}>Pick the level of detail needed for review.</Card.Description>
					{/snippet}
				</Questionnaire.Description>
				<Card.Action>
					<Questionnaire.Progress />
				</Card.Action>
			</Card.Header>
			<Card.Content>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="summary">Summary only</Questionnaire.Choice>
					<Questionnaire.Choice value="files">Summary and changed files</Questionnaire.Choice>
					<Questionnaire.Choice value="review">Full review handoff</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Card.Content>
		</Questionnaire.Item>

		<Card.Footer>
			<Questionnaire.Actions class="w-full">
				<Questionnaire.Previous />
				<Questionnaire.Next>Next</Questionnaire.Next>
				<Questionnaire.Submit>Create task</Questionnaire.Submit>
			</Questionnaire.Actions>
		</Card.Footer>
	</Card.Root>
</Questionnaire.Root>
