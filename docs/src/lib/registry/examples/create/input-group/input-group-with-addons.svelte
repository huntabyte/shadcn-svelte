<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Addons">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-icon-left-05">Addon (inline-start)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-icon-left-05" />
				<InputGroup.Addon>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
						remixicon="RiSearchLine"
						class="text-muted-foreground"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-icon-right-07">Addon (inline-end)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-icon-right-07" />
				<InputGroup.Addon align="inline-end">
					<IconPlaceholder
						lucide="EyeOffIcon"
						tabler="IconEyeClosed"
						hugeicons="ViewOffIcon"
						phosphor="EyeSlashIcon"
						remixicon="RiEyeOffLine"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-icon-both-09">Addon (inline-start and inline-end)</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-icon-both-09" />
				<InputGroup.Addon>
					<IconPlaceholder
						lucide="MicIcon"
						tabler="IconMicrophone"
						hugeicons="VoiceIcon"
						phosphor="MicrophoneIcon"
						remixicon="RiMicLine"
						class="text-muted-foreground"
					/>
				</InputGroup.Addon>
				<InputGroup.Addon align="inline-end">
					<IconPlaceholder
						lucide="RadioIcon"
						tabler="IconPlayerRecordFilled"
						hugeicons="RecordIcon"
						phosphor="RecordIcon"
						remixicon="RiRecordCircleLine"
						class="animate-pulse text-red-500"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-addon-20">Addon (block-start)</Field.Label>
			<InputGroup.Root class="h-auto">
				<InputGroup.Input id="input-addon-20" />
				<InputGroup.Addon align="block-start">
					<InputGroup.Text>First Name</InputGroup.Text>
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="AlertCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
						class="text-muted-foreground ml-auto"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-addon-21">Addon (block-end)</Field.Label>
			<InputGroup.Root class="h-auto">
				<InputGroup.Input id="input-addon-21" />
				<InputGroup.Addon align="block-end">
					<InputGroup.Text>20/240 characters</InputGroup.Text>
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="AlertCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
						class="text-muted-foreground ml-auto"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-icon-both-10">Multiple Icons</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-icon-both-10" />
				<InputGroup.Addon align="inline-end">
					<IconPlaceholder
						lucide="StarIcon"
						tabler="IconStar"
						hugeicons="StarIcon"
						phosphor="StarIcon"
						remixicon="RiStarLine"
					/>
					<InputGroup.Button size="icon-xs" onclick={() => {}}>
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
				<InputGroup.Addon>
					<IconPlaceholder
						lucide="RadioIcon"
						tabler="IconPlayerRecordFilled"
						hugeicons="RecordIcon"
						phosphor="RecordIcon"
						remixicon="RiRecordCircleLine"
						class="animate-pulse text-red-500"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-description-10">Description</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-description-10" />
				<InputGroup.Addon align="inline-end">
					<IconPlaceholder
						lucide="InfoIcon"
						tabler="IconInfoCircle"
						hugeicons="AlertCircleIcon"
						phosphor="InfoIcon"
						remixicon="RiInformationLine"
					/>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-label-10">Label</Field.Label>
			<InputGroup.Root>
				<InputGroup.Addon>
					<Field.Label for="input-label-10">Label</Field.Label>
				</InputGroup.Addon>
				<InputGroup.Input id="input-label-10" />
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-optional-12" aria-label="Optional" />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Text>(optional)</InputGroup.Text>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
	</Field.Group>
</Example>
