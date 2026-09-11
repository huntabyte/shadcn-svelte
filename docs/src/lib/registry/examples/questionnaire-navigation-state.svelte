<script lang="ts">
	import { toast } from "svelte-sonner";
	import type { QuestionnaireItemStatus } from "@shadcn/svelte/questionnaire";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{ name: "permission", required: true },
		{ name: "verification", required: true },
	] as const;

	type ItemName = "permission" | "verification";

	let item = $state<ItemName>("permission");
	let statuses = $state<Record<ItemName, QuestionnaireItemStatus>>({
		permission: "unanswered",
		verification: "unanswered",
	});
	const unanswered = $derived(statuses[item] === "unanswered");

	function setStatus(name: ItemName, status: QuestionnaireItemStatus) {
		statuses = { ...statuses, [name]: status };
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		toast("Permissions saved", {
			description: `Permission: ${formData.get("permission") ?? "None"} · Verification: ${formData.get("verification") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root
	class="mx-auto max-w-md"
	bind:item
	{items}
	onItemChange={(nextItem) => (item = nextItem as ItemName)}
	onSubmit={handleSubmit}
>
	<Questionnaire.Progress />

	<Questionnaire.Item
		name="permission"
		required
		onStatusChange={(status) => setStatus("permission", status)}
	>
		<Questionnaire.Title>What may the agent modify?</Questionnaire.Title>
		<Questionnaire.Description>
			Next is intentionally disabled until an answer is selected.
		</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="files">Project files</Questionnaire.Choice>
			<Questionnaire.Choice value="tests">Project files and tests</Questionnaire.Choice>
			<Questionnaire.Choice value="config">Files, tests, and configuration</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item
		name="verification"
		required
		onStatusChange={(status) => setStatus("verification", status)}
	>
		<Questionnaire.Title>What must pass before completion?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="tests">Tests</Questionnaire.Choice>
			<Questionnaire.Choice value="types">Tests and types</Questionnaire.Choice>
			<Questionnaire.Choice value="all">Tests, types, and visual QA</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Actions>
		<Questionnaire.Previous />
		<Questionnaire.Next class="data-[status=unanswered]:opacity-50" disabled={unanswered} variant="secondary">
			Next
		</Questionnaire.Next>
		<Questionnaire.Submit disabled={unanswered}>Save permissions</Questionnaire.Submit>
	</Questionnaire.Actions>
</Questionnaire.Root>
