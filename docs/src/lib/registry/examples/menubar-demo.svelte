<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";

	let bookmarks = $state(false);
	let fullUrls = $state(true);
	let profileRadioValue = $state("benoit");
</script>

<Menubar.Root class="w-72">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Item>
					New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item disabled>New Incognito Window</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Sub>
					<Menubar.SubTrigger>Share</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Group>
							<Menubar.Item>Email link</Menubar.Item>
							<Menubar.Item>Messages</Menubar.Item>
							<Menubar.Item>Notes</Menubar.Item>
						</Menubar.Group>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item>
					Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Item>
					Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Sub>
					<Menubar.SubTrigger>Find</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Group>
							<Menubar.Item>Search the web</Menubar.Item>
						</Menubar.Group>
						<Menubar.Separator />
						<Menubar.Group>
							<Menubar.Item>Find...</Menubar.Item>
							<Menubar.Item>Find Next</Menubar.Item>
							<Menubar.Item>Find Previous</Menubar.Item>
						</Menubar.Group>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item>Cut</Menubar.Item>
				<Menubar.Item>Copy</Menubar.Item>
				<Menubar.Item>Paste</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content class="w-44">
			<Menubar.Group>
				<Menubar.CheckboxItem bind:checked={bookmarks}>
					Bookmarks Bar
				</Menubar.CheckboxItem>
				<Menubar.CheckboxItem bind:checked={fullUrls}>
					Full URLs
				</Menubar.CheckboxItem>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>
					Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item disabled inset>
					Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>Hide Sidebar</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Profiles</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.RadioGroup bind:value={profileRadioValue}>
				<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
				<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
				<Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
			</Menubar.RadioGroup>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>Edit...</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>Add Profile...</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
