<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let showBookmarks = $state(true);
	let showUrls = $state(false);
	let theme = $state("system");
</script>

<Example title="With Inset">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content class="w-44">
			<ContextMenu.Group>
				<ContextMenu.Label>Actions</ContextMenu.Label>
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
				<ContextMenu.Item inset>Paste</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Label inset>Appearance</ContextMenu.Label>
				<ContextMenu.CheckboxItem inset bind:checked={showBookmarks}>
					Bookmarks
				</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem inset bind:checked={showUrls}>
					Full URLs
				</ContextMenu.CheckboxItem>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Label inset>Theme</ContextMenu.Label>
				<ContextMenu.RadioGroup bind:value={theme}>
					<ContextMenu.RadioItem inset value="light">Light</ContextMenu.RadioItem>
					<ContextMenu.RadioItem inset value="dark">Dark</ContextMenu.RadioItem>
					<ContextMenu.RadioItem inset value="system">System</ContextMenu.RadioItem>
				</ContextMenu.RadioGroup>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger inset>More Options</ContextMenu.SubTrigger>
				<ContextMenu.SubContent>
					<ContextMenu.Group>
						<ContextMenu.Item>Save Page...</ContextMenu.Item>
						<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
					</ContextMenu.Group>
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
