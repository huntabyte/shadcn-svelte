<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	const items = [
		{ name: "scope", required: true },
		{ name: "strategy", required: true },
		{ name: "tests", required: true },
		{ name: "delivery", required: true },
	];
	const questions = [
		{
			name: "scope",
			title: "How large is the change?",
			choices: [
				["small", "Small patch"],
				["medium", "Feature-sized change"],
				["large", "Cross-package change"],
			],
		},
		{
			name: "strategy",
			title: "How should commits be organized?",
			choices: [
				["single", "Single commit"],
				["logical", "Logical commits"],
				["squash", "Squash before review"],
			],
		},
		{
			name: "tests",
			title: "Which tests should run?",
			choices: [
				["targeted", "Targeted tests"],
				["package", "Package suite"],
				["workspace", "Full workspace"],
			],
		},
		{
			name: "delivery",
			title: "How should the work be delivered?",
			choices: [
				["patch", "Patch only"],
				["commit", "Committed locally"],
				["branch", "Push a review branch"],
			],
		},
	];
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Pull request plan ready", {
			description: `Scope: ${data.get("scope") ?? "None"} · Commits: ${data.get("strategy") ?? "None"} · Tests: ${data.get("tests") ?? "None"} · Delivery: ${data.get("delivery") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" defaultItem="scope" {items} onsubmit={submit}>
	<Questionnaire.Progress class="w-full">
		{#snippet children(state)}
			<div class="mb-2 flex gap-1.5" aria-hidden="true">
				{#each Array(state.total) as _, index (index)}<span
						class={index < state.current
							? "h-1.5 flex-1 rounded-full bg-primary"
							: "h-1.5 flex-1 rounded-full bg-muted"}
					></span>{/each}
			</div>
			<span>Checkpoint {state.current} of {state.total}</span>
		{/snippet}
	</Questionnaire.Progress>
	{#each questions as question (question.name)}<Questionnaire.Item name={question.name} required
			><Questionnaire.Title>{question.title}</Questionnaire.Title><Questionnaire.Choices
				>{#each question.choices as choice (choice[0])}<Questionnaire.Choice value={choice[0]}
						>{choice[1]}</Questionnaire.Choice
					>{/each}</Questionnaire.Choices
			><Questionnaire.Error /></Questionnaire.Item
		>{/each}
	<Questionnaire.Actions
		><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next><Questionnaire.Submit
			>Finish plan</Questionnaire.Submit
		></Questionnaire.Actions
	>
</Questionnaire.Root>
