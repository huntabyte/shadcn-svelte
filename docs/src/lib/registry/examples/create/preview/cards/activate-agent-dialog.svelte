<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>
			<strong>Ship faster & safer</strong> with <strong>Vercel Agent</strong>
		</Card.Title>
		<Card.Description>
			Your use is subject to Vercel's
			<a href="https://vercel.com/legal" class="underline">Public Beta Agreement</a> and
			<a href="https://vercel.com/legal/ai-terms" class="underline">AI Product Terms</a>.
		</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Item.Group class="gap-0">
			<Item.Root size="xs" class="px-0">
				<Item.Media variant="icon" class="self-start">
					<IconPlaceholder
						lucide="CheckCircle2Icon"
						tabler="IconCircleCheckFilled"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
						class="size-5 fill-primary text-primary-foreground"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title
						class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground"
					>
						<strong>Code reviews</strong> with full codebase context to catch
						<strong>hard-to-find</strong> bugs.
					</Item.Title>
				</Item.Content>
			</Item.Root>
			<Item.Root size="xs" class="px-0">
				<Item.Media variant="icon" class="self-start">
					<IconPlaceholder
						lucide="CheckCircle2Icon"
						tabler="IconCircleCheckFilled"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
						class="size-5 fill-primary text-primary-foreground"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title
						class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground"
					>
						<strong>Code suggestions</strong> validated in sandboxes before you merge.
					</Item.Title>
				</Item.Content>
			</Item.Root>
			<Item.Root size="xs" class="px-0">
				<Item.Media variant="icon" class="self-start">
					<IconPlaceholder
						lucide="CheckCircle2Icon"
						tabler="IconCircleCheckFilled"
						hugeicons="CheckmarkCircle02Icon"
						phosphor="CheckCircleIcon"
						remixicon="RiCheckboxCircleLine"
						class="size-5 fill-primary text-primary-foreground"
					/>
				</Item.Media>
				<Item.Content>
					<Item.Title
						class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground"
					>
						<strong>Root-cause analysis</strong> for production issues with deployment context.
						<Badge variant="secondary" class="ml-1 bg-chart-1 text-chart-5">
							Requires Observability Plus
						</Badge>
					</Item.Title>
				</Item.Content>
			</Item.Root>
		</Item.Group>
		<Alert.Root>
			<Alert.Description>
				Pro teams get $100 in Vercel Agent trial credit for 2 weeks after activation.
			</Alert.Description>
		</Alert.Root>
	</Card.Content>
	<Card.Footer class="justify-end gap-2">
		<Button variant="outline">Cancel</Button>
		<Button>Enable with $100 credits</Button>
	</Card.Footer>
</Card.Root>
