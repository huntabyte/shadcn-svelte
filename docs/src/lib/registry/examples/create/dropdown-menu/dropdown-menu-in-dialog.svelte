<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="In Dialog">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Open Dialog</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Dropdown Menu Example</Dialog.Title>
				<Dialog.Description>
					Click the button below to see the dropdown menu.
				</Dialog.Description>
			</Dialog.Header>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="w-fit" {...props}>Open Menu</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
						Copy
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="ScissorsIcon"
							tabler="IconCut"
							hugeicons="ScissorIcon"
							phosphor="ScissorsIcon"
							remixicon="RiScissorsLine"
						/>
						Cut
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="ClipboardPasteIcon"
							tabler="IconClipboard"
							hugeicons="ClipboardIcon"
							phosphor="ClipboardIcon"
							remixicon="RiClipboardLine"
						/>
						Paste
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>More Options</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent>
								<DropdownMenu.Item>Save Page...</DropdownMenu.Item>
								<DropdownMenu.Item>Create Shortcut...</DropdownMenu.Item>
								<DropdownMenu.Item>Name Window...</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>
					<DropdownMenu.Separator />
					<DropdownMenu.Item variant="destructive">
						<IconPlaceholder
							lucide="TrashIcon"
							tabler="IconTrash"
							hugeicons="DeleteIcon"
							phosphor="TrashIcon"
							remixicon="RiDeleteBinLine"
						/>
						Delete
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
