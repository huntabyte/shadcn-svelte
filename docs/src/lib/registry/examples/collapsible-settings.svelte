<script lang="ts">
	import MaximizeIcon from "@lucide/svelte/icons/maximize";
	import MinimizeIcon from "@lucide/svelte/icons/minimize";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	let isOpen = $state(false);
</script>

<Card.Root class="mx-auto w-full max-w-xs" size="sm">
	<Card.Header>
		<Card.Title>Radius</Card.Title>
		<Card.Description>Set the corner radius of the element.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Collapsible.Root bind:open={isOpen} class="flex items-start gap-2">
			<Field.Group class="grid w-full grid-cols-2 gap-2">
				<Field.Field>
					<Field.Label class="sr-only">Radius X</Field.Label>
					<Input id="radius-x" placeholder="0" value={0} />
				</Field.Field>
				<Field.Field>
					<Field.Label class="sr-only">Radius Y</Field.Label>
					<Input id="radius-y" placeholder="0" value={0} />
				</Field.Field>
				<Collapsible.Content class="col-span-full grid grid-cols-subgrid gap-2">
					<Field.Field>
						<Field.Label class="sr-only">Radius X</Field.Label>
						<Input id="radius-x-2" placeholder="0" value={0} />
					</Field.Field>
					<Field.Field>
						<Field.Label class="sr-only">Radius Y</Field.Label>
						<Input id="radius-y-2" placeholder="0" value={0} />
					</Field.Field>
				</Collapsible.Content>
			</Field.Group>
			<Collapsible.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="icon" {...props}>
						{#if isOpen}
							<MinimizeIcon />
						{:else}
							<MaximizeIcon />
						{/if}
					</Button>
				{/snippet}
			</Collapsible.Trigger>
		</Collapsible.Root>
	</Card.Content>
</Card.Root>
