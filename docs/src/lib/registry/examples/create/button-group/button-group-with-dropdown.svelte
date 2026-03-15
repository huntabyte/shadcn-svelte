<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Dropdown">
	<div class="flex flex-col gap-4">
		<ButtonGroup>
			<Button variant="outline">Update</Button>
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
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Disable</DropdownMenu.Item>
					<DropdownMenu.Item variant="destructive">Uninstall</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</ButtonGroup>
		<ButtonGroup>
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
				<DropdownMenu.Content align="end" class="w-50">
					<DropdownMenu.Group>
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
								lucide="AlertTriangleIcon"
								tabler="IconAlertTriangle"
								hugeicons="AlertCircleIcon"
								phosphor="WarningIcon"
								remixicon="RiErrorWarningLine"
							/>
							Report Conversation
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<IconPlaceholder
								lucide="UserRoundXIcon"
								tabler="IconUserX"
								hugeicons="UserRemove01Icon"
								phosphor="UserMinusIcon"
								remixicon="RiUserUnfollowLine"
							/>
							Block User
						</DropdownMenu.Item>
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
		</ButtonGroup>
	</div>
</Example>
