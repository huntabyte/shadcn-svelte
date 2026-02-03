<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Buttons">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-button-13">Button</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-13" />
				<InputGroup.Addon>
					<InputGroup.Button>Default</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-14" />
				<InputGroup.Addon>
					<InputGroup.Button variant="outline">Outline</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-15" />
				<InputGroup.Addon>
					<InputGroup.Button variant="secondary">Secondary</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-16" />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button variant="secondary">Button</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-17" />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button size="icon-xs">
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-button-18" />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button variant="secondary" size="icon-xs">
						<IconPlaceholder
							lucide="TrashIcon"
							tabler="IconTrash"
							hugeicons="DeleteIcon"
							phosphor="TrashIcon"
							remixicon="RiDeleteBinLine"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
	</Field.Group>
</Example>
