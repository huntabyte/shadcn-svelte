<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.Item>Back</ContextMenu.Item>
		<ContextMenu.Item disabled>Forward</ContextMenu.Item>
		<ContextMenu.Item>Reload</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger>More Tools</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item>Save Page As...</ContextMenu.Item>
				<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger>Developer</ContextMenu.SubTrigger>
					<ContextMenu.SubContent>
						<ContextMenu.Item>View Source</ContextMenu.Item>
						<ContextMenu.Item>Inspect</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.Item>Print...</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
