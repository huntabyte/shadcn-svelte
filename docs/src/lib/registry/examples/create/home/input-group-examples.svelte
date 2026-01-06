<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let isFavorite = $state(false);
	let voiceEnabled = $state(false);
</script>

<Example title="Input Group">
	<div class="flex flex-col gap-6">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Search..." />
			<InputGroup.Addon>
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
				/>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
		</InputGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="example.com" class="pl-1!" />
			<InputGroup.Addon>
				<InputGroup.Text>https://</InputGroup.Text>
			</InputGroup.Addon>
			<InputGroup.Addon align="inline-end">
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button
								class="rounded-full"
								size="icon-xs"
								aria-label="Info"
								{...props}
							>
								<IconPlaceholder
									lucide="InfoIcon"
									tabler="IconInfoCircle"
									hugeicons="AlertCircleIcon"
									phosphor="InfoIcon"
								/>
							</InputGroup.Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
				</Tooltip.Root>
			</InputGroup.Addon>
		</InputGroup.Root>
		<Field.Field>
			<Label for="input-secure-19" class="sr-only">Input Secure</Label>
			<InputGroup.Root>
				<InputGroup.Input id="input-secure-19" class="pl-0.5!" />
				<InputGroup.Addon>
					<Popover.Root>
						<Popover.Trigger>
							{#snippet child({ props })}
								<InputGroup.Button
									variant="secondary"
									size="icon-xs"
									aria-label="Info"
									{...props}
								>
									<IconPlaceholder
										lucide="InfoIcon"
										tabler="IconInfoCircle"
										hugeicons="AlertCircleIcon"
										phosphor="InfoIcon"
									/>
								</InputGroup.Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content
							align="start"
							alignOffset={10}
							class="flex flex-col gap-1 rounded-xl text-sm"
						>
							<p class="font-medium">Your connection is not secure.</p>
							<p>You should not enter any sensitive information on this site.</p>
						</Popover.Content>
					</Popover.Root>
				</InputGroup.Addon>
				<InputGroup.Addon class="text-muted-foreground pl-1!">https://</InputGroup.Addon>
				<InputGroup.Addon align="inline-end">
					<InputGroup.Button
						onclick={() => (isFavorite = !isFavorite)}
						size="icon-xs"
						aria-label="Favorite"
					>
						<IconPlaceholder
							lucide="StarIcon"
							tabler="IconStar"
							hugeicons="StarIcon"
							phosphor="StarIcon"
							data-favorite={isFavorite}
							class="data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
						/>
					</InputGroup.Button>
				</InputGroup.Addon>
			</InputGroup.Root>
		</Field.Field>
		<ButtonGroup.Root class="w-full">
			<ButtonGroup.Root>
				<Button variant="outline" size="icon" aria-label="Add">
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
					/>
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root class="flex-1">
				<InputGroup.Root>
					<InputGroup.Input
						placeholder={voiceEnabled
							? "Record and send audio..."
							: "Send a message..."}
						disabled={voiceEnabled}
					/>
					<InputGroup.Addon align="inline-end">
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<InputGroup.Button
										onclick={() => (voiceEnabled = !voiceEnabled)}
										data-active={voiceEnabled}
										class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
										aria-pressed={voiceEnabled}
										size="icon-xs"
										aria-label="Voice Mode"
										{...props}
									>
										<IconPlaceholder
											lucide="AudioLinesIcon"
											tabler="IconWaveSine"
											hugeicons="AudioWave01Icon"
											phosphor="MicrophoneIcon"
										/>
									</InputGroup.Button>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Content>Voice Mode</Tooltip.Content>
						</Tooltip.Root>
					</InputGroup.Addon>
				</InputGroup.Root>
			</ButtonGroup.Root>
		</ButtonGroup.Root>
		<InputGroup.Root>
			<InputGroup.Textarea placeholder="Ask, Search or Chat..." />
			<InputGroup.Addon align="block-end">
				<InputGroup.Button
					variant="outline"
					class="style-lyra:rounded-none rounded-full"
					size="icon-xs"
					aria-label="Add"
				>
					<IconPlaceholder
						lucide="PlusIcon"
						tabler="IconPlus"
						hugeicons="PlusSignIcon"
						phosphor="PlusIcon"
					/>
				</InputGroup.Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button variant="ghost" {...props}>Auto</InputGroup.Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" align="start" class="[--radius:0.95rem]">
						<DropdownMenu.Group>
							<DropdownMenu.Item>Auto</DropdownMenu.Item>
							<DropdownMenu.Item>Agent</DropdownMenu.Item>
							<DropdownMenu.Item>Manual</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<InputGroup.Text class="ml-auto">52% used</InputGroup.Text>
				<Separator orientation="vertical" class="h-4!" />
				<InputGroup.Button
					variant="default"
					class="style-lyra:rounded-none rounded-full"
					size="icon-xs"
				>
					<IconPlaceholder
						lucide="ArrowUpIcon"
						tabler="IconArrowUp"
						hugeicons="ArrowUp01Icon"
						phosphor="ArrowUpIcon"
					/>
					<span class="sr-only">Send</span>
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Example>
