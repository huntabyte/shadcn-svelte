<script lang="ts">
	import * as Questionnaire from "./index.js";

	let {
		onsubmit,
	}: {
		onsubmit?: (event: SubmitEvent) => void;
	} = $props();

	const items = [
		{
			name: "direction",
			required: true,
			choices: [{ value: "dashboard" }, { value: "settings" }],
		},
		{
			name: "signals",
			choices: [{ value: "progress" }, { value: "risks" }],
		},
	] as const;
</script>

<Questionnaire.Root {items} shortcuts="letters" {onsubmit}>
	<Questionnaire.Progress />
	<Questionnaire.Item name="direction" required>
		<Questionnaire.Title>What should we build?</Questionnaire.Title>
		<Questionnaire.Description>Choose one.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="dashboard">
				<Questionnaire.ChoiceInput aria-label="Dashboard" />
				<Questionnaire.ChoiceLabel>Dashboard</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
			<Questionnaire.Choice value="settings">
				<Questionnaire.ChoiceInput aria-label="Settings" />
				<Questionnaire.ChoiceLabel>Settings</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Item name="signals" multiple>
		<Questionnaire.Title>What should updates include?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="progress">
				<Questionnaire.ChoiceInput aria-label="Progress" />
				<Questionnaire.ChoiceLabel>Progress</Questionnaire.ChoiceLabel>
			</Questionnaire.Choice>
			<Questionnaire.Choice value="risks">
				<Questionnaire.ChoiceInput aria-label="Risks" />
				<Questionnaire.ChoiceLabel>Risks</Questionnaire.ChoiceLabel>
			</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Previous>Previous</Questionnaire.Previous>
	<Questionnaire.Skip>Skip</Questionnaire.Skip>
	<Questionnaire.Next>Next</Questionnaire.Next>
	<Questionnaire.Submit>Submit</Questionnaire.Submit>
</Questionnaire.Root>
