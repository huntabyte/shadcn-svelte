<script lang="ts">
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
</script>

<Resizable.PanelGroup orientation="vertical" class="min-h-[200px] max-w-md rounded-lg border">
	<Resizable.Panel defaultSize={25}>
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">Header</span>
		</div>
	</Resizable.Panel>
	<Resizable.Handle />
	<Resizable.Panel defaultSize={75}>
		<div class="flex h-full items-center justify-center p-6">
			<span class="font-semibold">Content</span>
		</div>
	</Resizable.Panel>
</Resizable.PanelGroup>
