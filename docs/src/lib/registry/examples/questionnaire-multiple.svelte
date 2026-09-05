<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	const items = [
		{
			choices: [{ value: "source" }, { value: "tests" }, { value: "docs" }, { value: "history" }],
			name: "context",
			required: true,
		},
	];
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const values = new FormData(event.currentTarget as HTMLFormElement).getAll("context");
		toast("Context selected", { description: `Context: ${values.join(", ") || "None"}` });
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" {items} shortcuts="letters" onsubmit={submit}>
	<Questionnaire.Item name="context" multiple required
		><Questionnaire.Title>What context should the agent inspect?</Questionnaire.Title
		><Questionnaire.Description
			>Select every source that may affect the implementation.</Questionnaire.Description
		><Questionnaire.Choices
			><Questionnaire.Choice value="source">Relevant source files</Questionnaire.Choice
			><Questionnaire.Choice value="tests">Existing tests</Questionnaire.Choice
			><Questionnaire.Choice value="docs">Architecture documentation</Questionnaire.Choice
			><Questionnaire.Choice value="history">Recent commit history</Questionnaire.Choice
			></Questionnaire.Choices
		><Questionnaire.Error /></Questionnaire.Item
	>
	<Questionnaire.Actions
		><Questionnaire.Submit>Share context</Questionnaire.Submit></Questionnaire.Actions
	>
</Questionnaire.Root>
