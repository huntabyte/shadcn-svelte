<script lang="ts">
	import * as AlertDialog from "$lib/registry/ui/alert-dialog/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const colorVariants = [
		"--background",
		"--foreground",
		"--primary",
		"--secondary",
		"--muted",
		"--accent",
		"--destructive",
		"--chart-1",
		"--chart-2",
		"--chart-3",
		"--chart-4",
		"--chart-5",
	];

	let sliderValue = $state(500);
	let radioValue = $state("apple");
	let switchChecked = $state(true);
	let checkbox1Checked = $state(true);
	let checkbox2Checked = $state(false);
</script>

<div
	class="bg-muted dark:bg-background flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-12"
>
	<div class="grid max-w-3xl gap-4 sm:grid-cols-2">
		<div class="flex flex-col gap-4">
			<Card.Root>
				<Card.Content class="flex flex-col gap-6">
					<div class="flex flex-col gap-1">
						<div class="text-2xl font-medium">Style Overview</div>
						<div class="text-muted-foreground line-clamp-2 text-base">
							Designers love packing quirky glyphs into test phrases. This is a
							preview of the typography styles.
						</div>
					</div>
					<div class="grid grid-cols-6 gap-3">
						{#each colorVariants as variant (variant)}
							<div
								class="flex flex-col flex-wrap items-center gap-2"
								style="--color: var({variant})"
							>
								<div
									class="after:border-border relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:mix-blend-darken dark:after:mix-blend-lighten"
								></div>
								<div
									class="hidden max-w-14 truncate font-mono text-[0.60rem] md:block"
								>
									{variant}
								</div>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Content>
					<div class="grid grid-cols-8 place-items-center gap-4">
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="CircleAlertIcon"
								tabler="IconExclamationCircle"
								hugeicons="AlertCircleIcon"
								phosphor="WarningCircleIcon"
								remixicon="RiErrorWarningLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="TrashIcon"
								tabler="IconTrash"
								hugeicons="Delete02Icon"
								phosphor="TrashIcon"
								remixicon="RiDeleteBinLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ShareIcon"
								tabler="IconShare"
								hugeicons="Share03Icon"
								phosphor="ShareIcon"
								remixicon="RiShareLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ShoppingBagIcon"
								tabler="IconShoppingBag"
								hugeicons="ShoppingBag01Icon"
								phosphor="BagIcon"
								remixicon="RiShoppingBagLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="MoreHorizontalIcon"
								tabler="IconDots"
								hugeicons="MoreHorizontalCircle01Icon"
								phosphor="DotsThreeIcon"
								remixicon="RiMoreLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="Loader2Icon"
								tabler="IconLoader"
								hugeicons="Loading03Icon"
								phosphor="SpinnerIcon"
								remixicon="RiLoaderLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="PlusIcon"
								tabler="IconPlus"
								hugeicons="PlusSignIcon"
								phosphor="PlusIcon"
								remixicon="RiAddLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="MinusIcon"
								tabler="IconMinus"
								hugeicons="MinusSignIcon"
								phosphor="MinusIcon"
								remixicon="RiSubtractLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ArrowLeftIcon"
								tabler="IconArrowLeft"
								hugeicons="ArrowLeft02Icon"
								phosphor="ArrowLeftIcon"
								remixicon="RiArrowLeftLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ArrowRightIcon"
								tabler="IconArrowRight"
								hugeicons="ArrowRight02Icon"
								phosphor="ArrowRightIcon"
								remixicon="RiArrowRightLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="CheckIcon"
								tabler="IconCheck"
								hugeicons="Tick02Icon"
								phosphor="CheckIcon"
								remixicon="RiCheckLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ChevronDownIcon"
								tabler="IconChevronDown"
								hugeicons="ArrowDown01Icon"
								phosphor="CaretDownIcon"
								remixicon="RiArrowDownSLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="ChevronRightIcon"
								tabler="IconChevronRight"
								hugeicons="ArrowRight01Icon"
								phosphor="CaretRightIcon"
								remixicon="RiArrowRightSLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="Search01Icon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
							/>
						</Card.Root>
						<Card.Root
							class="ring-border flex size-8 items-center justify-center rounded-md p-0 ring *:[svg]:size-4"
						>
							<IconPlaceholder
								lucide="SettingsIcon"
								tabler="IconSettings"
								hugeicons="Settings01Icon"
								phosphor="GearIcon"
								remixicon="RiSettingsLine"
							/>
						</Card.Root>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
		<div class="flex flex-col gap-4">
			<Card.Root class="w-full">
				<Card.Content class="flex flex-col gap-6">
					<div class="flex flex-col gap-4">
						<div class="flex flex-wrap gap-2">
							<Button>Button</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="destructive">Delete</Button>
						</div>
						<Item.Root variant="outline">
							<Item.Content>
								<Item.Title>Two-factor authentication</Item.Title>
								<Item.Description class="text-pretty xl:hidden 2xl:block">
									Verify via email or phone number.
								</Item.Description>
							</Item.Content>
							<Item.Actions class="hidden md:flex">
								<Button size="sm" variant="secondary">Enable</Button>
							</Item.Actions>
						</Item.Root>
					</div>
					<Slider
						type="single"
						bind:value={sliderValue}
						max={1000}
						min={0}
						step={10}
						class="flex-1"
						aria-label="Slider"
					/>
					<Field.Group>
						<Field.Field>
							<InputGroup.Root>
								<InputGroup.Input placeholder="Name" />
								<InputGroup.Addon align="inline-end">
									<InputGroup.Text>
										<IconPlaceholder
											lucide="SearchIcon"
											tabler="IconSearch"
											hugeicons="Search01Icon"
											phosphor="MagnifyingGlassIcon"
											remixicon="RiSearchLine"
										/>
									</InputGroup.Text>
								</InputGroup.Addon>
							</InputGroup.Root>
						</Field.Field>
						<Field.Field class="flex-1">
							<Textarea placeholder="Message" class="resize-none" />
						</Field.Field>
					</Field.Group>
					<div class="flex items-center gap-2">
						<div class="flex gap-2">
							<Badge>Badge</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="outline">Outline</Badge>
						</div>
						<RadioGroup.Root bind:value={radioValue} class="ml-auto flex w-fit gap-3">
							<RadioGroup.Item value="apple" />
							<RadioGroup.Item value="banana" />
						</RadioGroup.Root>
						<div class="flex gap-3">
							<Checkbox bind:checked={checkbox1Checked} />
							<Checkbox bind:checked={checkbox2Checked} />
						</div>
					</div>
					<div class="flex items-center gap-4">
						<AlertDialog.Root>
							<AlertDialog.Trigger>
								{#snippet child({ props })}
									<Button variant="outline" {...props}>
										<span class="hidden md:block">Alert Dialog</span>
										<span class="block md:hidden">Dialog</span>
									</Button>
								{/snippet}
							</AlertDialog.Trigger>
							<AlertDialog.Content size="sm">
								<AlertDialog.Header>
									<AlertDialog.Title>
										Allow accessory to connect?
									</AlertDialog.Title>
									<AlertDialog.Description>
										Do you want to allow the USB accessory to connect to this
										device and your data?
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Don't allow</AlertDialog.Cancel>
									<AlertDialog.Action>Allow</AlertDialog.Action>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
						<ButtonGroup.Root>
							<Button variant="outline">Button Group</Button>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									{#snippet child({ props })}
										<Button variant="outline" size="icon" {...props}>
											<IconPlaceholder
												lucide="ChevronUpIcon"
												tabler="IconChevronUp"
												hugeicons="ArrowUp01Icon"
												phosphor="CaretUpIcon"
												remixicon="RiArrowUpSLine"
											/>
										</Button>
									{/snippet}
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end" side="top" class="w-40">
									<DropdownMenu.Group>
										<DropdownMenu.Label>Quick Actions</DropdownMenu.Label>
										<DropdownMenu.Item>Mute Conversation</DropdownMenu.Item>
										<DropdownMenu.Item>Mark as Read</DropdownMenu.Item>
										<DropdownMenu.Item>Block User</DropdownMenu.Item>
									</DropdownMenu.Group>
									<DropdownMenu.Separator />
									<DropdownMenu.Group>
										<DropdownMenu.Label>Conversation</DropdownMenu.Label>
										<DropdownMenu.Item>Share Conversation</DropdownMenu.Item>
										<DropdownMenu.Item>Copy Conversation</DropdownMenu.Item>
										<DropdownMenu.Item>Report Conversation</DropdownMenu.Item>
									</DropdownMenu.Group>
									<DropdownMenu.Separator />
									<DropdownMenu.Group>
										<DropdownMenu.Item variant="destructive">
											Delete Conversation
										</DropdownMenu.Item>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</ButtonGroup.Root>
						<Switch bind:checked={switchChecked} class="ml-auto" />
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
