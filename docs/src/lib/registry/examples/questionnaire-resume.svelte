<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	const items = [
		{ name: "change", required: true },
		{ name: "verification", required: true },
		{ name: "notes" },
	];
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Draft updated", {
			description: `Migration: ${data.get("change") ?? "None"} · Verification: ${data.getAll("verification").join(", ") || "None"} · Notes: ${data.get("notes") || "None"}`,
		});
	}
</script>

<Questionnaire.Root
	class="mx-auto max-w-md"
	defaultItem="verification"
	{items}
	onreset={() => toast("Saved answers restored")}
	onsubmit={submit}
>
	<Questionnaire.Progress />
	<Questionnaire.Item name="change" required
		><Questionnaire.Title>What kind of migration is this?</Questionnaire.Title
		><Questionnaire.Description
			>This answer was saved during the previous session.</Questionnaire.Description
		><Questionnaire.Choices
			><Questionnaire.Choice value="incremental" defaultChecked
				>Incremental migration</Questionnaire.Choice
			><Questionnaire.Choice value="cutover">Single cutover</Questionnaire.Choice
			></Questionnaire.Choices
		><Questionnaire.Error /></Questionnaire.Item
	>
	<Questionnaire.Item name="verification" multiple required
		><Questionnaire.Title>How should the migration be verified?</Questionnaire.Title
		><Questionnaire.Description
			>These checks were selected during the previous session.</Questionnaire.Description
		><Questionnaire.Choices
			><Questionnaire.Choice value="tests" defaultChecked>Run migration tests</Questionnaire.Choice
			><Questionnaire.Choice value="typecheck" defaultChecked
				>Run the typecheck</Questionnaire.Choice
			><Questionnaire.Choice value="manual">Perform a manual smoke test</Questionnaire.Choice
			></Questionnaire.Choices
		><Questionnaire.Error /></Questionnaire.Item
	>
	<Questionnaire.Item name="notes"
		><Questionnaire.Title>Anything else the agent should remember?</Questionnaire.Title
		><Questionnaire.Description>This note was saved with the draft.</Questionnaire.Description
		><Questionnaire.Input
			aria-label="Saved migration note"
			defaultValue="Keep the existing public API stable."
		/></Questionnaire.Item
	>
	<Questionnaire.Actions
		><Button type="reset" variant="outline">Reset changes</Button><Questionnaire.Previous
		/><Questionnaire.Next>Next</Questionnaire.Next><Questionnaire.Submit
			>Update draft</Questionnaire.Submit
		></Questionnaire.Actions
	>
</Questionnaire.Root>
