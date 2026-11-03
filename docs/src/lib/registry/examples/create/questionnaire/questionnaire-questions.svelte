<script lang="ts">
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
</script>

<Questionnaire.Item name="direction" required>
	<Questionnaire.Title>What should we prototype next?</Questionnaire.Title>
	<Questionnaire.Description
		>Choose one direction or write another answer.</Questionnaire.Description
	>
	<Questionnaire.Choices>
		<Questionnaire.Choice value="delegation">
			<span class="font-medium">Sub-agent delegation</span>
			<Questionnaire.ChoiceDescription>
				Show when work is delegated and what comes back.
			</Questionnaire.ChoiceDescription>
		</Questionnaire.Choice>
		<Questionnaire.Choice value="questions">
			<span class="font-medium">Question prompts</span>
			<Questionnaire.ChoiceDescription>
				Show choices while the agent waits for input.
			</Questionnaire.ChoiceDescription>
		</Questionnaire.Choice>
		<Questionnaire.Choice value="both">
			<span class="font-medium">Both together</span>
			<Questionnaire.ChoiceDescription>
				Explore one unified interaction pattern.
			</Questionnaire.ChoiceDescription>
		</Questionnaire.Choice>
		<Questionnaire.Input aria-label="Another direction" placeholder="Type another direction…" />
	</Questionnaire.Choices>
	<Questionnaire.Error />
</Questionnaire.Item>
<Questionnaire.Item name="signals" multiple>
	<Questionnaire.Title>What should every progress update include?</Questionnaire.Title>
	<Questionnaire.Description
		>Select all that apply, or skip this question.</Questionnaire.Description
	>
	<Questionnaire.Choices>
		<Questionnaire.Choice value="progress">Progress</Questionnaire.Choice>
		<Questionnaire.Choice value="decisions">Decisions</Questionnaire.Choice>
		<Questionnaire.Choice value="risks">Risks</Questionnaire.Choice>
	</Questionnaire.Choices>
	<Questionnaire.Error />
</Questionnaire.Item>
<Questionnaire.Item name="timing" required>
	<Questionnaire.Title>When should this be revisited?</Questionnaire.Title>
	<Questionnaire.Description>Choose when this should be revisited.</Questionnaire.Description>
	<Questionnaire.Choices>
		<Questionnaire.Choice value="week">This week</Questionnaire.Choice>
		<Questionnaire.Choice value="cycle">Next cycle</Questionnaire.Choice>
		<Questionnaire.Choice value="later">Revisit later</Questionnaire.Choice>
	</Questionnaire.Choices>
	<Questionnaire.Error />
</Questionnaire.Item>
