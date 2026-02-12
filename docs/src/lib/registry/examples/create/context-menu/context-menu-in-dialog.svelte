<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let open = $state(false);
</script>

<Example title="In Dialog">
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open Dialog</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Context Menu Example</Dialog.Title>
				<Dialog.Description>
					Right click on the area below to see the context menu.
				</Dialog.Description>
			</Dialog.Header>
			<ContextMenu.Root>
				<ContextMenu.Trigger
					class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
				>
					Right click here
				</ContextMenu.Trigger>
				<ContextMenu.Content>
					<ContextMenu.Group>
						<ContextMenu.Item>
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="CopyIcon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
							Copy
						</ContextMenu.Item>
						<ContextMenu.Item>
							<IconPlaceholder
								lucide="ScissorsIcon"
								tabler="IconCut"
								hugeicons="ScissorIcon"
								phosphor="ScissorsIcon"
								remixicon="RiScissorsLine"
							/>
							Cut
						</ContextMenu.Item>
						<ContextMenu.Item>
							<IconPlaceholder
								lucide="ClipboardPasteIcon"
								tabler="IconClipboard"
								hugeicons="ClipboardIcon"
								phosphor="ClipboardIcon"
								remixicon="RiClipboardLine"
							/>
							Paste
						</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger>More Options</ContextMenu.SubTrigger>
						<ContextMenu.SubContent>
							<ContextMenu.Group>
								<ContextMenu.Item>Save Page...</ContextMenu.Item>
								<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
								<ContextMenu.Item>Name Window...</ContextMenu.Item>
							</ContextMenu.Group>
							<ContextMenu.Separator />
							<ContextMenu.Group>
								<ContextMenu.Item>Developer Tools</ContextMenu.Item>
							</ContextMenu.Group>
						</ContextMenu.SubContent>
					</ContextMenu.Sub>
					<ContextMenu.Separator />
					<ContextMenu.Group>
						<ContextMenu.Item variant="destructive">
							<IconPlaceholder
								lucide="TrashIcon"
								tabler="IconTrash"
								hugeicons="DeleteIcon"
								phosphor="TrashIcon"
								remixicon="RiDeleteBinLine"
							/>
							Delete
						</ContextMenu.Item>
					</ContextMenu.Group>
				</ContextMenu.Content>
			</ContextMenu.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
