<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>File</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					<IconPlaceholder
						lucide="FileIcon"
						tabler="IconFile"
						hugeicons="FileIcon"
						phosphor="FileIcon"
						remixicon="RiFileLine"
					/>
					New File <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="FolderIcon"
						tabler="IconFolder"
						hugeicons="FolderIcon"
						phosphor="FolderIcon"
						remixicon="RiFolderLine"
					/>
					Open Folder
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item>
					<IconPlaceholder
						lucide="SaveIcon"
						tabler="IconDeviceFloppy"
						hugeicons="FloppyDiskIcon"
						phosphor="FloppyDiskIcon"
						remixicon="RiSaveLine"
					/>
					Save <Menubar.Shortcut>⌘S</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>More</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Group>
					<Menubar.Item>
						<IconPlaceholder
							lucide="CircleDashedIcon"
							tabler="IconCircleDashed"
							hugeicons="DashedLineCircleIcon"
							phosphor="CircleDashedIcon"
							remixicon="RiLoaderLine"
						/>
						Settings
					</Menubar.Item>
					<Menubar.Item>
						<IconPlaceholder
							lucide="CircleDashedIcon"
							tabler="IconCircleDashed"
							hugeicons="DashedLineCircleIcon"
							phosphor="CircleDashedIcon"
							remixicon="RiLoaderLine"
						/>
						Help
					</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item variant="destructive">
						<IconPlaceholder
							lucide="CircleDashedIcon"
							tabler="IconCircleDashed"
							hugeicons="DashedLineCircleIcon"
							phosphor="CircleDashedIcon"
							remixicon="RiLoaderLine"
						/>
						Delete
					</Menubar.Item>
				</Menubar.Group>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
