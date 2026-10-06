<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{ name: "task", required: true },
		{ name: "review", required: true },
		{ name: "delivery", required: true },
	] as const;

	const itemClass =
		"data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent workflow saved", {
			description: `Task: ${formData.get("task") ?? "None"} · Review: ${formData.get("review") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" defaultItem="task" {items} onSubmit={handleSubmit}>
	<Questionnaire.Progress />

	<Questionnaire.Item class={itemClass} name="task" required>
		<Questionnaire.Title>What should the agent do?</Questionnaire.Title>
		<Questionnaire.Description>Choose the task for this run.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="implement">Implement the requested change</Questionnaire.Choice>
			<Questionnaire.Choice value="debug">Debug the current behavior</Questionnaire.Choice>
			<Questionnaire.Choice value="review">Review the implementation</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item class={itemClass} name="review" required>
		<Questionnaire.Title>How should the work be reviewed?</Questionnaire.Title>
		<Questionnaire.Description>Select the verification depth.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="targeted">Targeted checks</Questionnaire.Choice>
			<Questionnaire.Choice value="complete">Complete test suite</Questionnaire.Choice>
			<Questionnaire.Choice value="manual">Tests and manual QA</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item class={itemClass} name="delivery" required>
		<Questionnaire.Title>How should the result be delivered?</Questionnaire.Title>
		<Questionnaire.Description>Choose the final handoff format.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="summary">Concise summary</Questionnaire.Choice>
			<Questionnaire.Choice value="diff">Summary and changed files</Questionnaire.Choice>
			<Questionnaire.Choice value="handoff">Detailed review handoff</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Actions>
		<Questionnaire.Previous />
		<Questionnaire.Next>Next</Questionnaire.Next>
		<Questionnaire.Submit>Save workflow</Questionnaire.Submit>
	</Questionnaire.Actions>
</Questionnaire.Root>
