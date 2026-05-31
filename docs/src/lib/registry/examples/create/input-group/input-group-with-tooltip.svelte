<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let country = $state("+1");
</script>

<Example title="With Tooltip, Dropdown, Popover">
	<Field.Group>
		<Field.Field>
			<Field.Label for="input-tooltip-20">Tooltip</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-tooltip-20" />
				<InputGroup.Addon align="inline-end">
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<InputGroup.Button {...props} class="rounded-full" size="icon-xs">
									<IconPlaceholder
										lucide="InfoIcon"
										tabler="IconInfoCircle"
										hugeicons="AlertCircleIcon"
										phosphor="InfoIcon"
										remixicon="RiInformationLine"
									/>
								</InputGroup.Button>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
					</Tooltip.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-dropdown-21">Dropdown</Field.Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-dropdown-21" />
				<InputGroup.Addon>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<InputGroup.Button
									{...props}
									class="text-muted-foreground tabular-nums"
								>
									{country}
									<IconPlaceholder
										lucide="ChevronDownIcon"
										tabler="IconChevronDown"
										hugeicons="ArrowDownIcon"
										phosphor="CaretDownIcon"
										remixicon="RiArrowDownSLine"
									/>
								</InputGroup.Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							align="start"
							class="min-w-16"
							sideOffset={10}
							alignOffset={-8}
						>
							<DropdownMenu.Item onclick={() => (country = "+1")}
								>+1</DropdownMenu.Item
							>
							<DropdownMenu.Item onclick={() => (country = "+44")}
								>+44</DropdownMenu.Item
							>
							<DropdownMenu.Item onclick={() => (country = "+46")}
								>+46</DropdownMenu.Item
							>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="input-secure-19">Popover</Field.Label>
			<InputGroup.Root>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<InputGroup.Addon {...props}>
								<InputGroup.Button variant="secondary" size="icon-xs">
									<IconPlaceholder
										lucide="InfoIcon"
										tabler="IconInfoCircle"
										hugeicons="AlertCircleIcon"
										phosphor="InfoIcon"
										remixicon="RiInformationLine"
									/>
								</InputGroup.Button>
							</InputGroup.Addon>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content align="start">
						<div class="space-y-2">
							<h4 class="leading-none font-medium">Your connection is not secure.</h4>
							<p class="text-muted-foreground text-sm">
								You should not enter any sensitive information on this site.
							</p>
						</div>
					</Popover.Content>
				</Popover.Root>
				<InputGroup.Addon class="text-muted-foreground pl-1">https://</InputGroup.Addon>
				<InputGroup.Input id="input-secure-19" />
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button size="icon-xs" onclick={() => {}}>
						<IconPlaceholder
							lucide="StarIcon"
							tabler="IconStar"
							hugeicons="StarIcon"
							phosphor="StarIcon"
							remixicon="RiStarLine"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="url">Button Group</Field.Label>
			<ButtonGroup.Root>
				<ButtonGroup.Text>https://</ButtonGroup.Text>
				<InputGroup.Root>
					<InputGroup.Input id="url" />
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
				<ButtonGroup.Text>.com</ButtonGroup.Text>
			</ButtonGroup.Root>
			<Field.Description>This is a description of the input group.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
