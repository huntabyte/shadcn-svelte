<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let showBookmarks = $state(true);
	let showUrls = $state(false);
	let theme = $state("system");
</script>

<Example title="With Inset">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>View</Menubar.Trigger>
			<Menubar.Content class="w-44">
				<Menubar.Group>
					<Menubar.Label>Actions</Menubar.Label>
					<Menubar.Item>
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="CopyIcon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
						Copy
					</Menubar.Item>
					<Menubar.Item>
						<IconPlaceholder
							lucide="ScissorsIcon"
							tabler="IconCut"
							hugeicons="ScissorIcon"
							phosphor="ScissorsIcon"
							remixicon="RiScissorsLine"
						/>
						Cut
					</Menubar.Item>
					<Menubar.Item inset>Paste</Menubar.Item>
				</Menubar.Group>
				<Menubar.Separator />
				<Menubar.Group>
					<Menubar.Label inset>Appearance</Menubar.Label>
					<Menubar.CheckboxItem inset bind:checked={showBookmarks}>
						Bookmarks
					</Menubar.CheckboxItem>
					<Menubar.CheckboxItem inset bind:checked={showUrls}>
						Full URLs
					</Menubar.CheckboxItem>
				</Menubar.Group>
				<Menubar.Separator />
				<Menubar.Group>
					<Menubar.Label inset>Theme</Menubar.Label>
					<Menubar.RadioGroup bind:value={theme}>
						<Menubar.RadioItem inset value="light">Light</Menubar.RadioItem>
						<Menubar.RadioItem inset value="dark">Dark</Menubar.RadioItem>
						<Menubar.RadioItem inset value="system">System</Menubar.RadioItem>
					</Menubar.RadioGroup>
				</Menubar.Group>
				<Menubar.Separator />
				<Menubar.Sub>
					<Menubar.SubTrigger inset>More Options</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Group>
							<Menubar.Item>Save Page...</Menubar.Item>
							<Menubar.Item>Create Shortcut...</Menubar.Item>
						</Menubar.Group>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
