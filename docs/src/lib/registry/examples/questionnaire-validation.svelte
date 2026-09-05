<script lang="ts">
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";
	type ItemName = "detail" | "audience";
	const items = [
		{ name: "detail", required: true },
		{ name: "audience", required: true },
	];
	const schema = z
		.object({ detail: z.enum(["summary", "complete"]), audience: z.enum(["team", "public"]) })
		.superRefine((answers, context) => {
			if (answers.audience === "public" && answers.detail === "summary")
				context.addIssue({
					code: "custom",
					message: "Public answers need enough context. Choose a complete answer.",
					path: ["detail"],
				});
		});
	let item = $state("detail");
	let errors = $state<Partial<Record<ItemName, string>>>({});
	function clearError(name: ItemName) {
		delete errors[name];
	}
	function submit(event: SubmitEvent) {
		event.preventDefault();
		const result = schema.safeParse(
			Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement))
		);
		if (result.success) {
			errors = {};
			toast("Agent response configured", {
				description: `Detail: ${result.data.detail} · Audience: ${result.data.audience}`,
			});
			return;
		}
		const next: Partial<Record<ItemName, string>> = {};
		for (const issue of result.error.issues) {
			const name = issue.path[0];
			if ((name === "detail" || name === "audience") && !next[name]) next[name] = issue.message;
		}
		errors = next;
		const first = result.error.issues[0]?.path[0];
		if (first === "detail" || first === "audience") item = first;
	}
</script>

{#snippet ValidationProgress()}<Questionnaire.Progress class="min-w-0"
		>{#snippet children(state)}{state.current} / {state.total}{/snippet}</Questionnaire.Progress
	>{/snippet}

<Questionnaire.Root class="mx-auto max-w-md" bind:item {items} onsubmit={submit}>
	<Card.Root class="w-full">
		<Questionnaire.Item invalid={Boolean(errors.detail)} name="detail" required
			><Card.Header
				><Questionnaire.Title>How much detail should the answer include?</Questionnaire.Title
				><Questionnaire.Description>Choose the response depth.</Questionnaire.Description
				><Card.Action>{@render ValidationProgress()}</Card.Action></Card.Header
			><Card.Content
				><Questionnaire.Choices
					><Questionnaire.Choice value="summary" onchange={() => clearError("detail")}
						>Concise summary</Questionnaire.Choice
					><Questionnaire.Choice value="complete" onchange={() => clearError("detail")}
						>Complete answer</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error>{errors.detail}</Questionnaire.Error></Card.Content
			></Questionnaire.Item
		>
		<Questionnaire.Item invalid={Boolean(errors.audience)} name="audience" required
			><Card.Header
				><Questionnaire.Title>Who will read the answer?</Questionnaire.Title
				><Questionnaire.Description
					>Public answers require complete context.</Questionnaire.Description
				><Card.Action>{@render ValidationProgress()}</Card.Action></Card.Header
			><Card.Content
				><Questionnaire.Choices
					><Questionnaire.Choice value="team" onchange={() => clearError("audience")}
						>My team</Questionnaire.Choice
					><Questionnaire.Choice value="public" onchange={() => clearError("audience")}
						>Public audience</Questionnaire.Choice
					></Questionnaire.Choices
				><Questionnaire.Error>{errors.audience}</Questionnaire.Error></Card.Content
			></Questionnaire.Item
		>
		<Card.Footer
			><Questionnaire.Actions
				><Questionnaire.Previous /><Questionnaire.Next>Next</Questionnaire.Next
				><Questionnaire.Submit>Validate answers</Questionnaire.Submit></Questionnaire.Actions
			></Card.Footer
		>
	</Card.Root>
</Questionnaire.Root>
