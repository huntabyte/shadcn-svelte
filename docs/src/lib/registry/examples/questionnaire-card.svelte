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
	];
	const uid = $props.id();
	const taskTitleId = `${uid}-task-title`;
	const outputTitleId = `${uid}-output-title`;
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent task created", {
			description: `Task: ${data.get("task") ?? "None"} · Handoff: ${data.get("output") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root
	class="mx-auto max-w-md"
	defaultItem="task"
	{items}
	shortcuts="numbers"
	onsubmit={submit}
>
	<Card.Root>
		<Questionnaire.Item aria-labelledby={taskTitleId} name="task" required
			><Card.Header
				><Card.Title
					id={taskTitleId}
					data-slot="questionnaire-title"
					class="cn-questionnaire-title cn-font-heading text-pretty"
					>What should the agent work on?</Card.Title
				><Card.Description
					data-slot="questionnaire-description"
					class="cn-questionnaire-description text-pretty text-muted-foreground"
					>Choose the task that should be handled next.</Card.Description
				><Card.Action><Questionnaire.Progress /></Card.Action></Card.Header
			><Card.Content
				><Questionnaire.Choices
					><Questionnaire.Choice value="fix">Fix the failing tests</Questionnaire.Choice
					><Questionnaire.Choice value="refactor">Refactor the data layer</Questionnaire.Choice
					><Questionnaire.Choice value="docs">Update the integration guide</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error /></Card.Content
			></Questionnaire.Item
		>
		<Questionnaire.Item aria-labelledby={outputTitleId} name="output" required
			><Card.Header
				><Card.Title
					id={outputTitleId}
					data-slot="questionnaire-title"
					class="cn-questionnaire-title cn-font-heading text-pretty"
					>What should the final handoff include?</Card.Title
				><Card.Description
					data-slot="questionnaire-description"
					class="cn-questionnaire-description text-pretty text-muted-foreground"
					>Pick the level of detail needed for review.</Card.Description
				><Card.Action><Questionnaire.Progress /></Card.Action></Card.Header
			><Card.Content
				><Questionnaire.Choices
					><Questionnaire.Choice value="summary">Summary only</Questionnaire.Choice
					><Questionnaire.Choice value="files">Summary and changed files</Questionnaire.Choice
					><Questionnaire.Choice value="review">Full review handoff</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error /></Card.Content
			></Questionnaire.Item
		>
		<Card.Footer
			><Questionnaire.Actions class="w-full"
				><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next
				><Questionnaire.Submit>Create task</Questionnaire.Submit></Questionnaire.Actions
			></Card.Footer
		>
	</Card.Root>
</Questionnaire.Root>
