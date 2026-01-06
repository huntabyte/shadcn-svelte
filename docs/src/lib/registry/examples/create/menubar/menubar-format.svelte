<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Format">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>Format</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Item>
					<IconPlaceholder
						lucide="BoldIcon"
						tabler="IconBold"
						hugeicons="TextBoldIcon"
						phosphor="TextBIcon"
					/>
					Bold <Menubar.Shortcut>⌘B</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="ItalicIcon"
						tabler="IconItalic"
						hugeicons="TextItalicIcon"
						phosphor="TextItalicIcon"
					/>
					Italic <Menubar.Shortcut>⌘I</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="UnderlineIcon"
						tabler="IconUnderline"
						hugeicons="TextUnderlineIcon"
						phosphor="TextUnderlineIcon"
					/>
					Underline <Menubar.Shortcut>⌘U</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.CheckboxItem checked>Strikethrough</Menubar.CheckboxItem>
				<Menubar.CheckboxItem>Code</Menubar.CheckboxItem>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>View</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.CheckboxItem>Show Ruler</Menubar.CheckboxItem>
				<Menubar.CheckboxItem checked>Show Grid</Menubar.CheckboxItem>
				<Menubar.Separator />
				<Menubar.Item inset>Zoom In</Menubar.Item>
				<Menubar.Item inset>Zoom Out</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
