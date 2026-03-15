<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let label = $state("personal");
</script>

<Example title="Button Group" class="items-center justify-center">
	<div class="flex flex-col gap-6">
		<ButtonGroup.Root>
			<ButtonGroup.Root class="hidden sm:flex">
				<Button variant="outline" size="icon-sm" aria-label="Go Back">
					<IconPlaceholder
						lucide="ArrowLeftIcon"
						tabler="IconArrowLeft"
						hugeicons="ArrowLeft01Icon"
						phosphor="ArrowLeftIcon"
						remixicon="RiArrowLeftLine"
					/>
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline" size="sm">Archive</Button>
				<Button variant="outline" size="sm">Report</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<Button variant="outline" size="sm">Snooze</Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								variant="outline"
								size="icon-sm"
								aria-label="More Options"
								{...props}
							>
								<IconPlaceholder
									lucide="ChevronDownIcon"
									tabler="IconChevronDown"
									hugeicons="ArrowDown01Icon"
									phosphor="CaretDownIcon"
									remixicon="RiArrowDownSLine"
								/>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-48">
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="MailCheckIcon"
									tabler="IconMailCheck"
									hugeicons="MailValidation01Icon"
									phosphor="EnvelopeIcon"
									remixicon="RiMailCheckLine"
								/>
								Mark as Read
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="ArchiveIcon"
									tabler="IconArchive"
									hugeicons="ArchiveIcon"
									phosphor="ArchiveIcon"
									remixicon="RiArchiveLine"
								/>
								Archive
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="ClockIcon"
									tabler="IconClock"
									hugeicons="ClockIcon"
									phosphor="ClockIcon"
									remixicon="RiTimeLine"
								/>
								Snooze
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="CalendarPlusIcon"
									tabler="IconCalendarPlus"
									hugeicons="CalendarAdd01Icon"
									phosphor="CalendarPlusIcon"
									remixicon="RiCalendarCheckLine"
								/>
								Add to Calendar
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<IconPlaceholder
									lucide="ListFilterIcon"
									tabler="IconFilterPlus"
									hugeicons="AddToListIcon"
									phosphor="ListPlusIcon"
									remixicon="RiAddBoxLine"
								/>
								Add to List
							</DropdownMenu.Item>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<IconPlaceholder
										lucide="TagIcon"
										tabler="IconTag"
										hugeicons="TagIcon"
										phosphor="TagIcon"
										remixicon="RiPriceTagLine"
									/>
									Label As...
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent>
										<DropdownMenu.Group>
											<DropdownMenu.RadioGroup bind:value={label}>
												<DropdownMenu.RadioItem value="personal">
													Personal
												</DropdownMenu.RadioItem>
												<DropdownMenu.RadioItem value="work"
													>Work</DropdownMenu.RadioItem
												>
												<DropdownMenu.RadioItem value="other"
													>Other</DropdownMenu.RadioItem
												>
											</DropdownMenu.RadioGroup>
										</DropdownMenu.Group>
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item variant="destructive">
								<IconPlaceholder
									lucide="Trash2Icon"
									tabler="IconTrash"
									hugeicons="Delete02Icon"
									phosphor="TrashIcon"
									remixicon="RiDeleteBinLine"
								/>
								Trash
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</ButtonGroup.Root>
			<ButtonGroup.Root class="hidden sm:flex">
				<Button variant="outline" size="icon-sm" aria-label="Previous">
					<IconPlaceholder
						lucide="ArrowLeftIcon"
						tabler="IconArrowLeft"
						hugeicons="ArrowLeft01Icon"
						phosphor="ArrowLeftIcon"
						remixicon="RiArrowLeftLine"
					/>
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Next">
					<IconPlaceholder
						lucide="ArrowRightIcon"
						tabler="IconArrowRight"
						hugeicons="ArrowRight01Icon"
						phosphor="ArrowRightIcon"
						remixicon="RiArrowRightLine"
					/>
				</Button>
			</ButtonGroup.Root>
		</ButtonGroup.Root>
		<div class="flex gap-4">
			<ButtonGroup.Root class="hidden sm:flex">
				<ButtonGroup.Root>
					<Button variant="outline">1</Button>
					<Button variant="outline">2</Button>
					<Button variant="outline">3</Button>
				</ButtonGroup.Root>
			</ButtonGroup.Root>
			<ButtonGroup.Root>
				<ButtonGroup.Root>
					<Button variant="outline">Follow</Button>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" size="icon" {...props}>
									<IconPlaceholder
										lucide="ChevronDownIcon"
										tabler="IconChevronDown"
										hugeicons="ArrowDown01Icon"
										phosphor="CaretDownIcon"
										remixicon="RiArrowDownSLine"
									/>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end" class="w-52">
							<DropdownMenu.Group>
								<DropdownMenu.Label>Quick Actions</DropdownMenu.Label>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="VolumeX"
										tabler="IconVolume"
										hugeicons="VolumeOffIcon"
										phosphor="SpeakerSlashIcon"
										remixicon="RiVolumeMuteLine"
									/>
									Mute Conversation
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="CheckIcon"
										tabler="IconCheck"
										hugeicons="Tick02Icon"
										phosphor="CheckIcon"
										remixicon="RiCheckLine"
									/>
									Mark as Read
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="UserRoundXIcon"
										tabler="IconUserX"
										hugeicons="UserRemove01Icon"
										phosphor="UserMinusIcon"
										remixicon="RiUserMinusLine"
									/>
									Block User
								</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Label>Conversation</DropdownMenu.Label>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="ShareIcon"
										tabler="IconShare"
										hugeicons="Share03Icon"
										phosphor="ShareIcon"
										remixicon="RiShareLine"
									/>
									Share Conversation
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="CopyIcon"
										tabler="IconCopy"
										hugeicons="Copy01Icon"
										phosphor="CopyIcon"
										remixicon="RiFileCopyLine"
									/>
									Copy Conversation
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<IconPlaceholder
										lucide="AlertTriangleIcon"
										tabler="IconAlertTriangle"
										hugeicons="AlertCircleIcon"
										phosphor="WarningIcon"
										remixicon="RiAlertLine"
									/>
									Report Conversation
								</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Group>
								<DropdownMenu.Item variant="destructive">
									<IconPlaceholder
										lucide="TrashIcon"
										tabler="IconTrash"
										hugeicons="Delete02Icon"
										phosphor="TrashIcon"
										remixicon="RiDeleteBinLine"
									/>
									Delete Conversation
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</ButtonGroup.Root>
				<ButtonGroup.Root>
					<Button variant="outline">
						<IconPlaceholder
							lucide="BotIcon"
							tabler="IconRobot"
							hugeicons="BotIcon"
							phosphor="RobotIcon"
							remixicon="RiRobotLine"
						/>
						Copilot
					</Button>
					<Popover.Root>
						<Popover.Trigger>
							{#snippet child({ props })}
								<Button
									variant="outline"
									size="icon"
									aria-label="Open Popover"
									{...props}
								>
									<IconPlaceholder
										lucide="ChevronDownIcon"
										tabler="IconChevronDown"
										hugeicons="ArrowDown01Icon"
										phosphor="CaretDownIcon"
										remixicon="RiArrowDownSLine"
									/>
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content align="end" class="w-96">
							<Popover.Header>
								<Popover.Title>Agent Tasks</Popover.Title>
								<Popover.Description>
									Describe your task in natural language. Copilot will work in the
									background and open a pull request.
								</Popover.Description>
							</Popover.Header>
							<div class="text-sm *:[p:not(:last-child)]:mb-2">
								<Textarea
									placeholder="Describe your task in natural language."
									class="min-h-32 resize-none"
								/>
							</div>
						</Popover.Content>
					</Popover.Root>
				</ButtonGroup.Root>
			</ButtonGroup.Root>
		</div>
	</div>
</Example>
