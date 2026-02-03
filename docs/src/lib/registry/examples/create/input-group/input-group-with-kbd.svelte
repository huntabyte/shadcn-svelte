<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Kbd">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-kbd-22">Input Group with Kbd</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-kbd-22" />
				<InputGroup.Addon>
					<Kbd.Root>⌘K</Kbd.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-kbd-23" />
				<InputGroup.Addon align="inline-end">
					<Kbd.Root>⌘K</Kbd.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-search-apps-24" placeholder="Search for Apps..." />
				<InputGroup.Addon align="inline-end">Ask AI</InputGroup.Addon>
				<InputGroup.Addon align="inline-end">
					<Kbd.Root>Tab</Kbd.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input id="input-search-type-25" placeholder="Type to search..." />
				<InputGroup.Addon align="inline-start">
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconServerSpark"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
					/>
				</InputGroup.Addon>
				<InputGroup.Addon align="inline-end">
					<Kbd.Group>
						<Kbd.Root>Ctrl</Kbd.Root>
						<Kbd.Root>C</Kbd.Root>
					</Kbd.Group>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-username-26">Username</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-username-26" value="shadcn" />
				<InputGroup.Addon align="inline-end">
					<div
						class="flex size-4 items-center justify-center rounded-full bg-green-500 dark:bg-green-800"
					>
						<IconPlaceholder
							lucide="CheckIcon"
							tabler="IconCheck"
							hugeicons="Tick02Icon"
							phosphor="CheckIcon"
							remixicon="RiCheckLine"
							class="size-3 text-white"
						/>
					</div>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description class="text-green-700">This username is available.</Field.Description
			>
		</Field.Field>
		<InputGroup.Root>
			<InputGroup.Input id="input-search-docs-27" placeholder="Search documentation..." />
			<InputGroup.Addon>
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="SearchIcon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
				/>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root data-disabled="true">
			<InputGroup.Input
				id="input-search-disabled-28"
				placeholder="Search documentation..."
				disabled
			/>
			<InputGroup.Addon>
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="SearchIcon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
				/>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">Disabled</InputGroup.Addon>
		</InputGroup.Root>
		<Field.Group class="grid grid-cols-2 gap-4">
			<Field.Field>
				<Field.Label for="input-group-11">First Name</Field.Label>
				<InputGroup.Root>
					<InputGroup.Input id="input-group-11" placeholder="First Name" />
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
			</Field.Field>
			<Field.Field>
				<Field.Label for="input-group-12">Last Name</Field.Label>
				<InputGroup.Root>
					<InputGroup.Input id="input-group-12" placeholder="Last Name" />
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
			</Field.Field>
		</Field.Group>
		<Field.Field data-disabled="true">
			<Field.Label for="input-group-29"
				>Loading (&quot;data-disabled=&quot;true&quot;)</Field.Label
			>
			<InputGroup.Root>
				<InputGroup.Input id="input-group-29" disabled value="shadcn" />
				<InputGroup.Addon align="inline-end">
					<Spinner />
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
