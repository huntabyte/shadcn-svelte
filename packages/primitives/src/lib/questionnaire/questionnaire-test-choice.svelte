<script lang="ts">
	import type { Snippet } from "svelte";
	import { Questionnaire } from "./index.js";
	import type { QuestionnaireChoiceProps } from "./types.js";

	let {
		children,
		value,
		"data-testid": testId,
		...props
	}: Omit<QuestionnaireChoiceProps, "children"> & {
		children?: Snippet;
		"data-testid"?: string;
	} = $props();
</script>

<Questionnaire.Choice data-testid={testId ?? `choice-${value}`} {value} {...props}>
	<Questionnaire.ChoiceInput data-testid={`input-${value}`} />
	<Questionnaire.ChoiceLabel>{@render children?.()}</Questionnaire.ChoiceLabel>
	<Questionnaire.ChoiceShortcut data-testid={`shortcut-${value}`} />
</Questionnaire.Choice>
