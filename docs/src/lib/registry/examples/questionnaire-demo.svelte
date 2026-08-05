<script lang="ts">
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	const items = [
		{ name: "direction", required: true },
		{ name: "detail", required: false },
	];
</script>

<Questionnaire.Root {items}>
	<Questionnaire.Progress />
	<Questionnaire.Item name="direction" required>
		<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
		<Questionnaire.Description>Choose a direction or write your own.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="delegation" label="Delegation" shortcut="A" />
			<Questionnaire.Choice value="questions" label="Question prompts" shortcut="B" />
			<Questionnaire.Input label="Another answer" placeholder="Type another answer…" />
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Item name="detail">
		<Questionnaire.Title>How much detail should it include?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="focused" label="Focused" />
			<Questionnaire.Choice value="complete" label="Complete flow" />
		</Questionnaire.Choices>
	</Questionnaire.Item>
	<Questionnaire.Actions>
		<Questionnaire.Button action="previous">Previous</Questionnaire.Button>
		<Questionnaire.Button action="skip">Skip</Questionnaire.Button>
		<Questionnaire.Button action="next">Next</Questionnaire.Button>
		<Questionnaire.Button action="submit">Submit</Questionnaire.Button>
	</Questionnaire.Actions>
</Questionnaire.Root>
