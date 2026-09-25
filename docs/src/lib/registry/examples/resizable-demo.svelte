<script lang="ts">
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
</script>

<Resizable.PanelGroup direction="horizontal" class="max-w-md rounded-lg border">
	<Resizable.Panel defaultSize={50}>
		<div class="flex h-[200px] items-center justify-center p-6">
			<span class="font-semibold">One</span>
		</div>
	</Resizable.Panel>
	<Resizable.Handle withHandle />
	<Resizable.Panel defaultSize={50}>
		<Resizable.PanelGroup direction="vertical">
			<Resizable.Panel defaultSize={25}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Two</span>
				</div>
			</Resizable.Panel>
			<Resizable.Handle withHandle />
			<Resizable.Panel defaultSize={75}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Three</span>
				</div>
			</Resizable.Panel>
		</Resizable.PanelGroup>
	</Resizable.Panel>
</Resizable.PanelGroup>
