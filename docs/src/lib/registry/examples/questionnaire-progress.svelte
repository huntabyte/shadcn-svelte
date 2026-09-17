<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Questionnaire from "$lib/registry/ui/questionnaire/index.js";

	const items = [
		{ name: "scope", required: true },
		{ name: "strategy", required: true },
		{ name: "tests", required: true },
		{ name: "delivery", required: true },
	] as const;

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		toast("Pull request plan ready", {
			description: `Scope: ${formData.get("scope") ?? "None"} · Commits: ${formData.get("strategy") ?? "None"} · Tests: ${formData.get("tests") ?? "None"} · Delivery: ${formData.get("delivery") ?? "None"}`,
		});
	}
</script>

<Questionnaire.Root class="mx-auto max-w-md" defaultItem="scope" {items} onSubmit={handleSubmit}>
	<Questionnaire.Progress class="w-full">
		{#snippet child({ props, current, total })}
			<div {...props}>
				<div class="mb-2 flex gap-1.5" aria-hidden="true">
					{#each Array.from({ length: total }, (_, index) => index) as index (index)}
						<span
							class={index < current
								? "h-1.5 flex-1 rounded-full bg-primary"
								: "h-1.5 flex-1 rounded-full bg-muted"}
						></span>
					{/each}
				</div>
				<span>Checkpoint {current} of {total}</span>
			</div>
		{/snippet}
	</Questionnaire.Progress>

	<Questionnaire.Item name="scope" required>
		<Questionnaire.Title>How large is the change?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="small">Small patch</Questionnaire.Choice>
			<Questionnaire.Choice value="medium">Feature-sized change</Questionnaire.Choice>
			<Questionnaire.Choice value="large">Cross-package change</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item name="strategy" required>
		<Questionnaire.Title>How should commits be organized?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="single">Single commit</Questionnaire.Choice>
			<Questionnaire.Choice value="logical">Logical commits</Questionnaire.Choice>
			<Questionnaire.Choice value="squash">Squash before review</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item name="tests" required>
		<Questionnaire.Title>Which tests should run?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="targeted">Targeted tests</Questionnaire.Choice>
			<Questionnaire.Choice value="package">Package suite</Questionnaire.Choice>
			<Questionnaire.Choice value="workspace">Full workspace</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Item name="delivery" required>
		<Questionnaire.Title>How should the work be delivered?</Questionnaire.Title>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="patch">Patch only</Questionnaire.Choice>
			<Questionnaire.Choice value="commit">Committed locally</Questionnaire.Choice>
			<Questionnaire.Choice value="branch">Push a review branch</Questionnaire.Choice>
		</Questionnaire.Choices>
		<Questionnaire.Error />
	</Questionnaire.Item>

	<Questionnaire.Actions>
		<Questionnaire.Previous />
		<Questionnaire.Next>Next</Questionnaire.Next>
		<Questionnaire.Submit>Finish plan</Questionnaire.Submit>
	</Questionnaire.Actions>
</Questionnaire.Root>
