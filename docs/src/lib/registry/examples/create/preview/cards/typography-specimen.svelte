<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { FONTS } from "$lib/fonts.js";

	const designSystem = useDesignSystem();

	const currentBody = $derived(FONTS.find((f) => f.value === designSystem.font));
	const currentHeading = $derived(
		designSystem.fontHeading === "inherit"
			? undefined
			: FONTS.find((f) => f.value === designSystem.fontHeading)
	);

	const headingLabel = $derived(
		currentHeading?.name && currentHeading.name !== currentBody?.name
			? currentHeading.name
			: "Inherit"
	);
	const bodyLabel = $derived(currentBody?.name ?? "Default");

	const categoryItems = [
		{ label: "General", value: "general" },
		{ label: "Bug Report", value: "bug" },
		{ label: "Feature Request", value: "feature" },
		{ label: "Improvement", value: "improvement" },
	];

	let categoryValue = $state<string>("general");
	const categoryLabel = $derived(
		categoryItems.find((item) => item.value === categoryValue)?.label ?? "General"
	);
</script>

<Card.Root>
	<Card.Content class="flex flex-col gap-2">
		<div class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
			{headingLabel} - {bodyLabel}
		</div>
		<p class="cn-font-heading text-2xl font-medium">Designing with rhythm and hierarchy.</p>
		<p class="text-muted-foreground text-sm leading-relaxed">
			A strong body style keeps long-form content readable and balances the visual weight of
			headings.
		</p>
		<p class="text-muted-foreground text-sm leading-relaxed">
			Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.
		</p>
	</Card.Content>
	<Card.Footer>
		<Dialog.Root>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" class="w-full" {...props}>Share Feedback</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Share Feedback</Dialog.Title>
					<Dialog.Description>
						Let us know how we can improve your experience.
					</Dialog.Description>
				</Dialog.Header>
				<Field.Group>
					<div class="grid grid-cols-2 gap-3">
						<Field.Field>
							<Field.Label for="feedback-name">Name</Field.Label>
							<Input id="feedback-name" placeholder="Your name" />
						</Field.Field>
						<Field.Field>
							<Field.Label for="feedback-email">Email</Field.Label>
							<Input id="feedback-email" type="email" placeholder="you@example.com" />
						</Field.Field>
					</div>
					<Field.Field>
						<Field.Label for="feedback-category">Category</Field.Label>
						<Select.Root type="single" bind:value={categoryValue}>
							<Select.Trigger id="feedback-category" class="w-full"
								>{categoryLabel}</Select.Trigger
							>
							<Select.Content>
								<Select.Group>
									{#each categoryItems as item (item.value)}
										<Select.Item value={item.value}>{item.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label for="feedback-message">Message</Field.Label>
						<Textarea
							id="feedback-message"
							placeholder="Tell us what's on your mind..."
							class="min-h-24 resize-none"
						/>
					</Field.Field>
				</Field.Group>
				<Dialog.Footer>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Cancel</Button>
						{/snippet}
					</Dialog.Close>
					<Button>Submit</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</Card.Footer>
</Card.Root>
