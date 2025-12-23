<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Insert">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>Insert</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Sub>
					<Menubar.SubTrigger>
						<IconPlaceholder
							lucide="ImageIcon"
							tabler="IconPhoto"
							hugeicons="ImageIcon"
							phosphor="ImageIcon"
						/>
						Media
					</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.Item>Image</Menubar.Item>
						<Menubar.Item>Video</Menubar.Item>
						<Menubar.Item>Audio</Menubar.Item>
					</Menubar.SubContent>
				</Menubar.Sub>
				<Menubar.Separator />
				<Menubar.Item>
					<IconPlaceholder
						lucide="LinkIcon"
						tabler="IconLink"
						hugeicons="LinkIcon"
						phosphor="LinkIcon"
					/>
					Link <Menubar.Shortcut>⌘K</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="TableIcon"
						tabler="IconTable"
						hugeicons="TableIcon"
						phosphor="TableIcon"
					/>
					Table
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Tools</Menubar.Trigger>
			<Menubar.Content class="w-44">
				<Menubar.Item>
					<IconPlaceholder
						lucide="SearchIcon"
						tabler="IconSearch"
						hugeicons="SearchIcon"
						phosphor="MagnifyingGlassIcon"
					/>
					Find & Replace <Menubar.Shortcut>⌘F</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
					/>
					Spell Check
				</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
