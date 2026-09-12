<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	const items = [
		{ name: "scope", required: true },
		{ name: "tests", required: true },
	];
	let open = $state(false);
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		open = false;
		toast("Clarification sent", {
			description: `Scope: ${data.get("scope") ?? "None"} · Verification: ${data.get("tests") ?? "None"}`,
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open clarification</Dialog.Trigger>
	<Dialog.Content>
		<Questionnaire.Root defaultItem="scope" {items} onsubmit={submit}>
			<Questionnaire.Item name="scope" required
				><Dialog.Header
					><Questionnaire.Progress /><Dialog.Title
						data-slot="questionnaire-title"
						class="cn-questionnaire-title cn-font-heading text-pretty"
						>Which files are in scope?</Dialog.Title
					><Dialog.Description
						data-slot="questionnaire-description"
						class="cn-questionnaire-description text-pretty text-muted-foreground"
						>Choose how broadly the agent can update the workspace.</Dialog.Description
					></Dialog.Header
				><Questionnaire.Choices
					><Questionnaire.Choice value="component">Component only</Questionnaire.Choice
					><Questionnaire.Choice value="feature">Complete feature directory</Questionnaire.Choice
					><Questionnaire.Choice value="workspace">Any related workspace file</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error /></Questionnaire.Item
			>
			<Questionnaire.Item name="tests" required
				><Dialog.Header
					><Questionnaire.Progress /><Dialog.Title
						data-slot="questionnaire-title"
						class="cn-questionnaire-title cn-font-heading text-pretty"
						>How much verification is needed?</Dialog.Title
					><Dialog.Description
						data-slot="questionnaire-description"
						class="cn-questionnaire-description text-pretty text-muted-foreground"
						>Choose the checks the agent should run before handoff.</Dialog.Description
					></Dialog.Header
				><Questionnaire.Choices
					><Questionnaire.Choice value="targeted">Targeted tests</Questionnaire.Choice
					><Questionnaire.Choice value="package">Package tests</Questionnaire.Choice
					><Questionnaire.Choice value="full">Full workspace verification</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error /></Questionnaire.Item
			>
			<Dialog.Footer
				><Dialog.Close class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close
				><Questionnaire.Actions
					><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next
					><Questionnaire.Submit>Send answer</Questionnaire.Submit></Questionnaire.Actions
				></Dialog.Footer
			>
		</Questionnaire.Root>
	</Dialog.Content>
</Dialog.Root>
