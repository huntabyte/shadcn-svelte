<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
</script>

<Example title="Horizontal">
	<Resizable.PaneGroup direction="horizontal" class="min-h-[200px] rounded-lg border">
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Sidebar</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane defaultSize={75}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Content</span>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</Example>
