<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
</script>

<Example title="With Checkboxes">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>View</Menubar.Trigger>
			<Menubar.Content class="w-64">
				<Menubar.CheckboxItem>Always Show Bookmarks Bar</Menubar.CheckboxItem>
				<Menubar.CheckboxItem checked>Always Show Full URLs</Menubar.CheckboxItem>
				<Menubar.Separator />
				<Menubar.Item inset>
					Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item disabled inset>
					Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Format</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.CheckboxItem checked>Strikethrough</Menubar.CheckboxItem>
				<Menubar.CheckboxItem>Code</Menubar.CheckboxItem>
				<Menubar.CheckboxItem>Superscript</Menubar.CheckboxItem>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
