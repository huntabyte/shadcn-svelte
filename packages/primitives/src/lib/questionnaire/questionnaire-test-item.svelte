<script lang="ts">
	import { Questionnaire } from "./index.js";
	import TestChoice from "./questionnaire-test-choice.svelte";
	import type { QuestionnaireItemProps } from "./types.js";

	let { disabled, name, onStatusChange, required, ...props }: QuestionnaireItemProps = $props();
</script>

<Questionnaire.Item data-testid={name} {disabled} {name} {onStatusChange} {required} {...props}>
	<Questionnaire.Title>{name}</Questionnaire.Title>
	<TestChoice data-testid={`${name}-choice`} value={`${name}-answer`}>Answer</TestChoice>
	<Questionnaire.Error data-testid={`${name}-error`} />
</Questionnaire.Item>
