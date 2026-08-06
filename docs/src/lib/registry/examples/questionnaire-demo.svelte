<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{
			choices: [{ value: "tool-calls" }, { value: "approvals" }, { value: "handoffs" }],
			name: "direction",
			required: true,
		},
		{
			choices: [
				{ value: "progress" },
				{ value: "decisions" },
				{ value: "risks" },
				{ value: "next-step" },
			],
			name: "signals",
		},
		{
			choices: [{ value: "now" }, { value: "next-cycle" }, { value: "backlog" }],
			name: "timing",
			required: true,
		},
	] as const;

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		toast("Agent plan saved", {
			description: `Direction: ${data.get("direction") ?? "None"} · Progress signals: ${data.getAll("signals").join(", ") || "None"} · Timing: ${data.get("timing") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root
	class="mx-auto max-w-md"
	defaultItem="direction"
	{items}
	shortcuts="letters"
	onsubmit={handleSubmit}
>
	<Questionnaire.Progress />
	<Questionnaire.Item name="direction" required>
		<Questionnaire.Title>What should the agent build next?</Questionnaire.Title>
		<Questionnaire.Description
			>Choose a direction or describe another task.</Questionnaire.Description
		>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="tool-calls"
				><span class="font-medium">Tool call timeline</span><span class="text-muted-foreground"
					>Show what the agent ran and what came back.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Choice value="approvals"
				><span class="font-medium">Approval checkpoints</span><span class="text-muted-foreground"
					>Ask before sensitive or destructive actions.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Choice value="handoffs"
				><span class="font-medium">Sub-agent handoffs</span><span class="text-muted-foreground"
					>Make delegated work and results easier to follow.</span
				></Questionnaire.Choice
			>
			<Questionnaire.Input
				aria-label="Another agent feature"
				placeholder="Describe another feature…"
			/>
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
			<Questionnaire.Choice value="next-step">Next step</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Item name="timing" required>
		<Questionnaire.Title>When should work begin?</Questionnaire.Title>
		<Questionnaire.Description
			>Choose when the agent should begin the work.</Questionnaire.Description
		>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="now">Start now</Questionnaire.Choice>
			<Questionnaire.Choice value="next-cycle">Next development cycle</Questionnaire.Choice>
			<Questionnaire.Choice value="backlog">Add it to the backlog</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>
	<Questionnaire.Actions>
		<Questionnaire.Previous />
		<Questionnaire.Skip />
		<Questionnaire.Next>Next</Questionnaire.Next>
		<Questionnaire.Submit>Save plan</Questionnaire.Submit>
	</Questionnaire.Actions>
</Questionnaire.Root>
