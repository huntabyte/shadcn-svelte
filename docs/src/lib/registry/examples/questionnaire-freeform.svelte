<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{
			choices: [{ value: "incremental" }, { value: "module" }, { value: "rewrite" }],
			name: "approach",
			required: true,
		},
	] as const;

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const approach = new FormData(event.currentTarget as HTMLFormElement).get("approach");
		toast("Approach selected", {
			description: `Approach: ${approach ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" {items} shortcuts="letters" onSubmit={handleSubmit}>
	<Questionnaire.Item name="approach" required>
		<Questionnaire.Title>How should the agent approach this refactor?</Questionnaire.Title>
		<Questionnaire.Description>
			Choose a strategy or write a more specific instruction.
		</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="incremental">Make the smallest safe change</Questionnaire.Choice>
			<Questionnaire.Choice value="module">Refactor one module at a time</Questionnaire.Choice>
			<Questionnaire.Choice value="rewrite">Replace the implementation completely</Questionnaire.Choice>
			<Questionnaire.Input
				aria-label="Another refactoring approach"
				placeholder="Describe another approach…"
			/>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Actions>
		<Questionnaire.Submit>Use this approach</Questionnaire.Submit>
	</Questionnaire.Actions>
</Questionnaire.Root>
