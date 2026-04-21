<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Content>
		<Collapsible.Root class="data-[state=open]:bg-muted rounded-md">
			<Collapsible.Trigger>
				{#snippet child({ props })}
					<Button variant="ghost" class="group w-full" {...props}>
						Product details
						<ChevronDownIcon class="ml-auto group-data-[state=open]:rotate-180" />
					</Button>
				{/snippet}
			</Collapsible.Trigger>
			<Collapsible.Content class="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
				<div>This panel can be expanded or collapsed to reveal additional content.</div>
				<Button size="xs">Learn More</Button>
			</Collapsible.Content>
		</Collapsible.Root>
	</Card.Content>
</Card.Root>
