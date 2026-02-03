<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let isOpen = $state(false);
</script>

<Example title="Settings" class="items-center">
	<Card.Root class="mx-auto w-full max-w-xs" size="sm">
		<Card.Header>
			<Card.Title>Radius</Card.Title>
			<Card.Description>Set the corner radius of the element.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Collapsible.Root bind:open={isOpen} class="flex items-start gap-2">
				<Field.Group class="grid w-full grid-cols-2 gap-2">
					<Field.Field>
						<Field.Label for="radius-x" class="sr-only">Radius X</Field.Label>
						<Input.Root id="radius" placeholder="0" />
					</Field.Field>
					<Field.Field>
						<Field.Label for="radius-y" class="sr-only">Radius Y</Field.Label>
						<Input.Root id="radius" placeholder="0" />
					</Field.Field>
					<Collapsible.Content class="col-span-full grid grid-cols-subgrid gap-2">
						<Field.Field>
							<Field.Label for="radius-x" class="sr-only">Radius X</Field.Label>
							<Input.Root id="radius" placeholder="0" />
						</Field.Field>
						<Field.Field>
							<Field.Label for="radius-y" class="sr-only">Radius Y</Field.Label>
							<Input.Root id="radius" placeholder="0" />
						</Field.Field>
					</Collapsible.Content>
				</Field.Group>
				<Collapsible.Trigger class="rounded-md">
					{#snippet child({ props })}
						<Button.Root variant="outline" size="icon" {...props}>
							{#if isOpen}
								<IconPlaceholder
									lucide="MinimizeIcon"
									tabler="IconMinimize"
									hugeicons="ArrowShrinkIcon"
									phosphor="CornersInIcon"
									remixicon="RiContractUpDownLine"
								/>
							{:else}
								<IconPlaceholder
									lucide="MaximizeIcon"
									tabler="IconBorderCorners"
									hugeicons="ArrowExpandIcon"
									phosphor="CornersOutIcon"
									remixicon="RiExpandUpDownLine"
								/>
							{/if}
						</Button.Root>
					{/snippet}
				</Collapsible.Trigger>
			</Collapsible.Root>
		</Card.Content>
	</Card.Root>
</Example>
