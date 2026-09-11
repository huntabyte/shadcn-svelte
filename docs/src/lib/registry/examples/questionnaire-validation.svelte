<script lang="ts">
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{ name: "detail", required: true },
		{ name: "audience", required: true },
	] as const;

	const questionnaireSchema = z
		.object({
			detail: z.enum(["summary", "complete"]),
			audience: z.enum(["team", "public"]),
		})
		.superRefine((answers, context) => {
			if (answers.audience === "public" && answers.detail === "summary") {
				context.addIssue({
					code: "custom",
					message: "Public answers need enough context. Choose a complete answer.",
					path: ["detail"],
				});
			}
		});

	type QuestionnaireItemName = keyof z.infer<typeof questionnaireSchema>;
	type QuestionnaireErrors = Partial<Record<QuestionnaireItemName, string>>;

	let item = $state("detail");
	let errors = $state<QuestionnaireErrors>({});

	function clearError(name: QuestionnaireItemName) {
		if (!errors[name]) return;
		const nextErrors = { ...errors };
		delete nextErrors[name];
		errors = nextErrors;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const result = questionnaireSchema.safeParse(
			Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement))
		);

		if (result.success) {
			errors = {};
			toast("Agent response configured", {
				description: `Detail: ${result.data.detail} · Audience: ${result.data.audience}`,
			});
			return;
		}

		const nextErrors: QuestionnaireErrors = {};
		for (const issue of result.error.issues) {
			const name = issue.path[0];
			if ((name === "detail" || name === "audience") && !nextErrors[name]) {
				nextErrors[name] = issue.message;
			}
		}

		const firstInvalidItem = result.error.issues[0]?.path[0];
		errors = nextErrors;
		if (firstInvalidItem === "detail" || firstInvalidItem === "audience") {
			item = firstInvalidItem;
		}
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" bind:item {items} onSubmit={handleSubmit}>
	<Card.Root class="w-full">
		<Questionnaire.Item invalid={Boolean(errors.detail)} name="detail" required>
			<Card.Header>
				<Questionnaire.Title>How much detail should the answer include?</Questionnaire.Title>
				<Questionnaire.Description>Choose the response depth.</Questionnaire.Description>
				<Card.Action>
					<Questionnaire.Progress class="min-w-0">
						{#snippet child({ props, current, total })}
							<div {...props}>{current} / {total}</div>
						{/snippet}
					</Questionnaire.Progress>
				</Card.Action>
			</Card.Header>
			<Card.Content>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="summary" onChange={() => clearError("detail")}>
						Concise summary
					</Questionnaire.Choice>
					<Questionnaire.Choice value="complete" onChange={() => clearError("detail")}>
						Complete answer
					</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error>{errors.detail}</Questionnaire.Error>
			</Card.Content>
		</Questionnaire.Item>

		<Questionnaire.Item invalid={Boolean(errors.audience)} name="audience" required>
			<Card.Header>
				<Questionnaire.Title>Who will read the answer?</Questionnaire.Title>
				<Questionnaire.Description>Public answers require complete context.</Questionnaire.Description>
				<Card.Action>
					<Questionnaire.Progress class="min-w-0">
						{#snippet child({ props, current, total })}
							<div {...props}>{current} / {total}</div>
						{/snippet}
					</Questionnaire.Progress>
				</Card.Action>
			</Card.Header>
			<Card.Content>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="team" onChange={() => clearError("audience")}>
						My team
					</Questionnaire.Choice>
					<Questionnaire.Choice value="public" onChange={() => clearError("audience")}>
						Public audience
					</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Error>{errors.audience}</Questionnaire.Error>
			</Card.Content>
		</Questionnaire.Item>

		<Card.Footer>
			<Questionnaire.Actions>
				<Questionnaire.Previous />
				<Questionnaire.Next>Next</Questionnaire.Next>
				<Questionnaire.Submit>Validate answers</Questionnaire.Submit>
			</Questionnaire.Actions>
		</Card.Footer>
	</Card.Root>
</Questionnaire.Root>
