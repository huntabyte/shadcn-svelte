<script lang="ts">
	import { toast } from "svelte-sonner";
	import type { QuestionnaireShortcutMode } from "@shadcn/svelte/questionnaire";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{
			choices: [{ value: "inspect" }, { value: "tests" }, { value: "patch" }],
			name: "action",
			required: true,
		},
	] as const;

	let shortcutSelect = $state("letters");
	const shortcuts = $derived(
		shortcutSelect === "letters" || shortcutSelect === "numbers"
			? (shortcutSelect as QuestionnaireShortcutMode)
			: undefined
	);

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const action = new FormData(event.currentTarget as HTMLFormElement).get("action");
		toast("Next action selected", {
			description: `Action: ${action ?? "None"} · Shortcuts: ${shortcuts ?? "none"}`,
		});
	}
</script>

<div class="relative mx-auto flex h-full w-full max-w-md flex-col">
	<NativeSelect.Root
		aria-label="Shortcut style"
		class="absolute end-0 top-0"
		bind:value={shortcutSelect}
	>
		<NativeSelect.Option value="none">No shortcuts</NativeSelect.Option>
		<NativeSelect.Option value="letters">Letters</NativeSelect.Option>
		<NativeSelect.Option value="numbers">Numbers</NativeSelect.Option>
	</NativeSelect.Root>

	<Questionnaire.Root class="mt-auto" {items} {shortcuts} onSubmit={handleSubmit}>
		<Questionnaire.Item name="action" required>
			<Questionnaire.Title>What should the agent do next?</Questionnaire.Title>
			<Questionnaire.Description>
				Use the displayed shortcut or navigate with the keyboard.
			</Questionnaire.Description>
			<Questionnaire.Choices>
				<Questionnaire.Choice value="inspect">Inspect the implementation</Questionnaire.Choice>
				<Questionnaire.Choice value="tests">Run the relevant tests</Questionnaire.Choice>
				<Questionnaire.Choice value="patch">Prepare the patch</Questionnaire.Choice>
			</Questionnaire.Choices>
			<Questionnaire.Error />
		</Questionnaire.Item>

		<Questionnaire.Actions>
			<Questionnaire.Submit>Confirm action</Questionnaire.Submit>
		</Questionnaire.Actions>
	</Questionnaire.Root>
</div>
