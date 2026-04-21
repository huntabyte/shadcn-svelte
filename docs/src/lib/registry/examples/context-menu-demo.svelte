<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";

	let showBookmarks = $state(true);
	let showFullURLs = $state(false);

	let value = $state("pedro");
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
	>
		<span class="hidden pointer-fine:inline-block">Right click here</span>
		<span class="hidden pointer-coarse:inline-block">Long press here</span>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Group>
			<ContextMenu.Item>
				Back
				<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Item disabled>
				Forward
				<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Item>
				Reload
				<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
			</ContextMenu.Item>
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger>More Tools</ContextMenu.SubTrigger>
				<ContextMenu.SubContent class="w-44">
					<ContextMenu.Group>
						<ContextMenu.Item>Save Page...</ContextMenu.Item>
						<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
						<ContextMenu.Item>Name Window...</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Group>
						<ContextMenu.Item>Developer Tools</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Group>
						<ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
					</ContextMenu.Group>
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.CheckboxItem bind:checked={showBookmarks}>
				Show Bookmarks
			</ContextMenu.CheckboxItem>
			<ContextMenu.CheckboxItem bind:checked={showFullURLs}>
				Show Full URLs
			</ContextMenu.CheckboxItem>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.Group>
			<ContextMenu.RadioGroup bind:value>
				<ContextMenu.Label>People</ContextMenu.Label>
				<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
				<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
			</ContextMenu.RadioGroup>
		</ContextMenu.Group>
	</ContextMenu.Content>
</ContextMenu.Root>
