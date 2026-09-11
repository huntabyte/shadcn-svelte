<script lang="ts">
	import { Questionnaire } from "./index.js";

	let {
		onSubmit,
		onItemChange,
	}: {
		onSubmit?: (event: SubmitEvent) => void;
		onItemChange?: (item: string) => void;
	} = $props();
</script>

<Questionnaire.Root data-testid="root" defaultItem="scope" {onSubmit} {onItemChange}>
	<Questionnaire.Progress data-testid="progress" />

	<Questionnaire.Item data-testid="scope" required name="scope">
		<Questionnaire.Title>What should come next?</Questionnaire.Title>
		<Questionnaire.Description id="scope-description">
			Choose one or write another answer.
		</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice data-testid="scope-delegation" value="delegation">
				<Questionnaire.ChoiceInput />
				<Questionnaire.ChoiceLabel>Delegation</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
			<Questionnaire.Choice data-testid="scope-questions" value="questions">
				<Questionnaire.ChoiceInput />
				<Questionnaire.ChoiceLabel>Question prompts</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
			<Questionnaire.Input data-testid="scope-input" aria-label="Another answer" />
		</Questionnaire.Choices>
		<Questionnaire.Error data-testid="scope-error" id="scope-error-message" />
	</Questionnaire.Item>

	<Questionnaire.Item data-testid="detail" required name="detail">
		<Questionnaire.Title>How much detail?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice data-testid="detail-focused" value="focused">
				<Questionnaire.ChoiceInput />
				<Questionnaire.ChoiceLabel>Focused</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
			<Questionnaire.Choice data-testid="detail-complete" value="complete">
				<Questionnaire.ChoiceInput />
				<Questionnaire.ChoiceLabel>Complete</Questionnaire.ChoiceLabel>
				<Questionnaire.ChoiceShortcut />
			</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error data-testid="detail-error" />
	</Questionnaire.Item>

	<Questionnaire.Previous data-testid="previous" />
	<Questionnaire.Skip data-testid="skip" />
	<Questionnaire.Next data-testid="next" />
	<Questionnaire.Submit data-testid="submit" />
</Questionnaire.Root>
