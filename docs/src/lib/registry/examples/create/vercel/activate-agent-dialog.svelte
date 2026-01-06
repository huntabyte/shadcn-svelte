<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const agentFeatures = [
		{
			id: "code-reviews",
			title: "Code reviews",
			description: "with full codebase context to catch",
			highlight: "hard-to-find",
			endText: "bugs.",
		},
		{
			id: "code-suggestions",
			title: "Code suggestions",
			description: "validated in sandboxes before you merge.",
		},
		{
			id: "root-cause",
			title: "Root-cause analysis",
			description: "for production issues with deployment context.",
			hasBadge: true,
		},
	];
</script>

<Example title="Activate Agent" class="items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Activate Agent</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content showCloseButton={false}>
			<Dialog.Header>
				<Dialog.Title>Ship faster & safer with Vercel Agent</Dialog.Title>
				<Dialog.Description>
					Your use is subject to Vercel's
					<a href="#/">Public Beta Agreement</a> and
					<a href="#/">AI Product Terms</a>.
				</Dialog.Description>
			</Dialog.Header>
			<div class="no-scrollbar flex max-h-[50vh] flex-col gap-4 overflow-y-auto">
				<Item.Group class="gap-0 pr-2">
					{#each agentFeatures as feature (feature.id)}
						<Item.Root size="xs" class="px-0">
							<Item.Media variant="icon" class="self-start">
								<IconPlaceholder
									lucide="CheckCircle2Icon"
									tabler="IconCircleCheckFilled"
									hugeicons="CheckmarkCircle02Icon"
									phosphor="CheckCircleIcon"
									class="fill-primary text-primary-foreground size-5"
								/>
							</Item.Media>
							<Item.Content>
								<Item.Title
									class="text-muted-foreground *:[strong]:text-foreground inline leading-relaxed font-normal *:[strong]:font-medium"
								>
									<strong>{feature.title}</strong>
									{feature.description}
									{#if feature.highlight}
										<strong>{feature.highlight}</strong> {feature.endText}
									{/if}
									{#if feature.hasBadge}
										<Badge
											variant="secondary"
											class="bg-blue-100 text-blue-700 hover:bg-blue-100"
										>
											Requires Observability Plus
										</Badge>
									{/if}
								</Item.Title>
							</Item.Content>
						</Item.Root>
					{/each}
				</Item.Group>
				<Alert.Root class="hidden sm:grid">
					<IconPlaceholder
						lucide="CircleDollarSignIcon"
						hugeicons="DollarCircleIcon"
						tabler="IconCoin"
						phosphor="CurrencyCircleDollarIcon"
					/>
					<Alert.Description>
						Pro teams get $100 in Vercel Agent trial credit for 2 weeks.
					</Alert.Description>
				</Alert.Root>
			</div>
			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Cancel</Button>
					{/snippet}
				</Dialog.Close>
				<Button>Enable with $100 credits</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</Example>
