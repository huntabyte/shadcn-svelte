<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
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
				<Dialog.Title>Menubar Example</Dialog.Title>
				<Dialog.Description>
					Use the menubar below to see the menu options.
				</Dialog.Description>
			</Dialog.Header>
			<Menubar.Root>
				<Menubar.Menu>
					<Menubar.Trigger>File</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="CopyIcon"
								phosphor="CopyIcon"
							/>
							Copy
						</Menubar.Item>
						<Menubar.Item>
							<IconPlaceholder
								lucide="ScissorsIcon"
								tabler="IconCut"
								hugeicons="ScissorIcon"
								phosphor="ScissorsIcon"
							/>
							Cut
						</Menubar.Item>
						<Menubar.Item>
							<IconPlaceholder
								lucide="ClipboardPasteIcon"
								tabler="IconClipboard"
								hugeicons="ClipboardIcon"
								phosphor="ClipboardIcon"
							/>
							Paste
						</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Sub>
							<Menubar.SubTrigger>More Options</Menubar.SubTrigger>
							<Menubar.SubContent>
								<Menubar.Item>Save Page...</Menubar.Item>
								<Menubar.Item>Create Shortcut...</Menubar.Item>
								<Menubar.Item>Name Window...</Menubar.Item>
								<Menubar.Separator />
								<Menubar.Item>Developer Tools</Menubar.Item>
							</Menubar.SubContent>
						</Menubar.Sub>
						<Menubar.Separator />
						<Menubar.Item variant="destructive">
							<IconPlaceholder
								lucide="TrashIcon"
								tabler="IconTrash"
								hugeicons="DeleteIcon"
								phosphor="TrashIcon"
							/>
							Delete
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
				<Menubar.Menu>
					<Menubar.Trigger>Edit</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
						</Menubar.Item>
						<Menubar.Item>
							Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</Menubar.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
