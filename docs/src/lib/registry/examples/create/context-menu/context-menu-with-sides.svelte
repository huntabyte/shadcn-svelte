<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<Example title="With Sides">
	<div class="grid grid-cols-2 gap-6">
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
			>
				Right click (top)
			</ContextMenu.Trigger>
			<ContextMenu.Content side="top">
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
			>
				Right click (right)
			</ContextMenu.Trigger>
			<ContextMenu.Content side="right">
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
			>
				Right click (bottom)
			</ContextMenu.Trigger>
			<ContextMenu.Content side="bottom">
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
		<ContextMenu.Root>
			<ContextMenu.Trigger
				class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
			>
				Right click (left)
			</ContextMenu.Trigger>
			<ContextMenu.Content side="left">
				<ContextMenu.Group>
					<ContextMenu.Item>Back</ContextMenu.Item>
					<ContextMenu.Item>Forward</ContextMenu.Item>
					<ContextMenu.Item>Reload</ContextMenu.Item>
				</ContextMenu.Group>
			</ContextMenu.Content>
		</ContextMenu.Root>
	</div>
</Example>
