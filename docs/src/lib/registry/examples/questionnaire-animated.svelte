<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	const items = [
		{ name: "task", required: true },
		{ name: "review", required: true },
		{ name: "delivery", required: true },
	];
	const itemClass =
		"data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";
	const questions = [
		{
			name: "task",
			title: "What should the agent do?",
			description: "Choose the task for this run.",
			choices: [
				["implement", "Implement the requested change"],
				["debug", "Debug the current behavior"],
				["review", "Review the implementation"],
			],
		},
		{
			name: "review",
			title: "How should the work be reviewed?",
			description: "Select the verification depth.",
			choices: [
				["targeted", "Targeted checks"],
				["complete", "Complete test suite"],
				["manual", "Tests and manual QA"],
			],
		},
		{
			name: "delivery",
			title: "How should the result be delivered?",
			description: "Choose the final handoff format.",
			choices: [
				["summary", "Concise summary"],
				["diff", "Summary and changed files"],
				["handoff", "Detailed review handoff"],
			],
		},
	];
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent workflow saved", {
			description: `Task: ${data.get("task") ?? "None"} · Review: ${data.get("review") ?? "None"} · Delivery: ${data.get("delivery") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" defaultItem="task" {items} onsubmit={submit}>
	<Questionnaire.Progress />
	{#each questions as question (question.name)}
		<Questionnaire.Item class={itemClass} name={question.name} required>
			<Questionnaire.Title>{question.title}</Questionnaire.Title>
			<Questionnaire.Description>{question.description}</Questionnaire.Description>
			<Questionnaire.Choices
				>{#each question.choices as choice (choice[0])}<Questionnaire.Choice value={choice[0]}
						>{choice[1]}</Questionnaire.Choice
					>{/each}</Questionnaire.Choices
			>
			<Questionnaire.Error />
		</Questionnaire.Item>
	{/each}
	<Questionnaire.Actions
		><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next><Questionnaire.Submit
			>Save workflow</Questionnaire.Submit
		></Questionnaire.Actions
	>
</Questionnaire.Root>
