<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
</script>

<Example title="In Dialog">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Open Dialog</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Hover Card Example</Dialog.Title>
				<Dialog.Description>
					Hover over the button below to see the hover card.
				</Dialog.Description>
			</Dialog.Header>
			<HoverCard.Root openDelay={100} closeDelay={100}>
				<HoverCard.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="w-fit" {...props}>Hover me</Button>
					{/snippet}
				</HoverCard.Trigger>
				<HoverCard.Content>
					<div
						class="style-lyra:gap-1 style-nova:gap-1.5 style-vega:gap-2 style-maia:gap-2 style-mira:gap-1 flex flex-col"
					>
						<h4 class="font-medium">Hover Card</h4>
						<p>
							This hover card appears inside a dialog. Hover over the button to see
							it.
						</p>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
