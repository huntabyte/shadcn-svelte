<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Fields">
	<Field.Group class="grid grid-cols-3 gap-4">
		<Field.Field class="col-span-2">
			<Label for="width">Width</Label>
			<ButtonGroup>
				<InputGroup.Root>
					<InputGroup.Input id="width" />
					<InputGroup.Addon class="text-muted-foreground">W</InputGroup.Addon>
					<InputGroup.Addon align="inline-end" class="text-muted-foreground">
						px
					</InputGroup.Addon>
				</InputGroup.Root>
				<Button variant="outline" size="icon">
					<IconPlaceholder
						lucide="MinusIcon"
						tabler="IconMinus"
						hugeicons="MinusSignIcon"
						phosphor="MinusIcon"
					/>
				</Button>
				<Button variant="outline" size="icon">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
					/>
				</Button>
			</ButtonGroup>
		</Field.Field>
	</Field.Group>
</Example>
