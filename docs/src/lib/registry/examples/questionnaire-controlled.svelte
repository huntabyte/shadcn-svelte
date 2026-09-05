<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	const items = [
		{ name: "scope", required: true },
		{ name: "checks", required: true },
		{ name: "output", required: true },
	];
	const labels: Record<string, string> = {
		scope: "Change scope",
		checks: "Verification",
		output: "Final output",
	};
	let item = $state("scope");
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent workflow configured", {
			description: `Scope: ${data.get("scope") ?? "None"} · Verification: ${data.get("checks") ?? "None"} · Output: ${data.get("output") ?? "None"}`,
		});
	}
</script>

<div class="relative mx-auto flex h-full w-full max-w-md flex-col">
	<p class="absolute end-0 top-0 text-sm text-muted-foreground" role="status">
		Current checkpoint: {labels[item]}
	</p>
	<Questionnaire.Root class="mt-auto" bind:item {items} onsubmit={submit}>
		<Questionnaire.Progress />
		<Questionnaire.Item name="scope" required
			><Questionnaire.Title>What may the agent change?</Questionnaire.Title
			><Questionnaire.Description
				>The host stores the active checkpoint while Questionnaire navigates.</Questionnaire.Description
			><Questionnaire.Choices
				><Questionnaire.Choice value="component">Only the target component</Questionnaire.Choice
				><Questionnaire.Choice value="tests">Component and related tests</Questionnaire.Choice
				><Questionnaire.Choice value="feature">The complete feature area</Questionnaire.Choice
				></Questionnaire.Choices
			><Questionnaire.Error /></Questionnaire.Item
		>
		<Questionnaire.Item name="checks" required
			><Questionnaire.Title>Which verification level should it use?</Questionnaire.Title
			><Questionnaire.Choices
				><Questionnaire.Choice value="targeted">Targeted tests</Questionnaire.Choice
				><Questionnaire.Choice value="package">Package tests and typecheck</Questionnaire.Choice
				><Questionnaire.Choice value="full">Full workspace verification</Questionnaire.Choice
				></Questionnaire.Choices
			><Questionnaire.Error /></Questionnaire.Item
		>
		<Questionnaire.Item name="output" required
			><Questionnaire.Title>What should the agent return when finished?</Questionnaire.Title
			><Questionnaire.Choices
				><Questionnaire.Choice value="summary">Concise summary</Questionnaire.Choice
				><Questionnaire.Choice value="diff">Summary with changed files</Questionnaire.Choice
				><Questionnaire.Choice value="handoff">Detailed implementation handoff</Questionnaire.Choice
				></Questionnaire.Choices
			><Questionnaire.Error /></Questionnaire.Item
		>
		<Questionnaire.Actions
			><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next><Questionnaire.Submit
				>Save workflow</Questionnaire.Submit
			></Questionnaire.Actions
		>
	</Questionnaire.Root>
</div>
