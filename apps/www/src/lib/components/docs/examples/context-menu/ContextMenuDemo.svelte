<script lang="ts">
	import * as ContextMenu from "$components/ui/context-menu";
	import { writable } from "svelte/store";

	const checked = {
		showBookmarks: writable(true),
		showFullURLs: writable(false)
	};

	const peopleRadioValue = writable("pedro");
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-64">
		<ContextMenu.Item inset>
			Back
			<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset>
			Reload
			<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item>
					Save Page As...
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
				<ContextMenu.Item>Name Window...</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>Developer Tools</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem checked={checked.showBookmarks}>
			Show Bookmarks Bar
			<ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut>
		</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem checked={checked.showFullURLs}>
			Show Full URLs
		</ContextMenu.CheckboxItem>
		<ContextMenu.Separator />
		<ContextMenu.RadioGroup value={peopleRadioValue}>
			<ContextMenu.Label inset>People</ContextMenu.Label>
			<ContextMenu.Separator />
			<ContextMenu.RadioItem value="pedro">
				Pedro Duarte
			</ContextMenu.RadioItem>
			<ContextMenu.RadioItem value="colm">
				Colm Tuite
			</ContextMenu.RadioItem>
		</ContextMenu.RadioGroup>
	</ContextMenu.Content>
</ContextMenu.Root>
