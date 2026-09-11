<script lang="ts">
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{ name: "scope", required: true },
		{ name: "tests", required: true },
	] as const;

	let open = $state(false);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		open = false;
		toast("Clarification sent", {
			description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("tests") ?? "None"}`,
		});
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Open clarification</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content>
		<Questionnaire.Root defaultItem="scope" {items} onSubmit={handleSubmit}>
			<Questionnaire.Item name="scope" required>
				<Dialog.Header>
					<Questionnaire.Progress />
					<Questionnaire.Title>
						{#snippet child({ props })}
							<Dialog.Title {...props}>Which files are in scope?</Dialog.Title>
						{/snippet}
					</Questionnaire.Title>
					<Questionnaire.Description>
						{#snippet child({ props })}
							<Dialog.Description {...props}>
								Choose how broadly the agent can update the workspace.
							</Dialog.Description>
						{/snippet}
					</Questionnaire.Description>
				</Dialog.Header>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="component">Component only</Questionnaire.Choice>
					<Questionnaire.Choice value="feature">Complete feature directory</Questionnaire.Choice>
					<Questionnaire.Choice value="workspace">Any related workspace file</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Questionnaire.Item>

			<Questionnaire.Item name="tests" required>
				<Dialog.Header>
					<Questionnaire.Progress />
					<Questionnaire.Title>
						{#snippet child({ props })}
							<Dialog.Title {...props}>How much verification is needed?</Dialog.Title>
						{/snippet}
					</Questionnaire.Title>
					<Questionnaire.Description>
						{#snippet child({ props })}
							<Dialog.Description {...props}>
								Choose the checks the agent should run before handoff.
							</Dialog.Description>
						{/snippet}
					</Questionnaire.Description>
				</Dialog.Header>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="targeted">Targeted tests</Questionnaire.Choice>
					<Questionnaire.Choice value="package">Package tests</Questionnaire.Choice>
					<Questionnaire.Choice value="full">Full workspace verification</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error />
			</Questionnaire.Item>

			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} type="button" variant="outline">Cancel</Button>
					{/snippet}
				</Dialog.Close>
				<Questionnaire.Actions>
					<Questionnaire.Previous />
					<Questionnaire.Next>Next</Questionnaire.Next>
					<Questionnaire.Submit>Send answer</Questionnaire.Submit>
				</Questionnaire.Actions>
			</Dialog.Footer>
		</Questionnaire.Root>
	</Dialog.Content>
</Dialog.Root>
