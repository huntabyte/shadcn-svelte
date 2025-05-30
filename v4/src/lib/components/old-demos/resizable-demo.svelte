<script lang="ts">
	import * as Resizable from "$lib/registry/ui/resizable";
</script>

<div class="flex w-full flex-col gap-6">
	<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border md:min-w-[450px]">
		<Resizable.Pane defaultSize={50}>
			<div class="flex h-[200px] items-center justify-center p-6">
				<span class="font-semibold">One</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane defaultSize={50}>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={25}>
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">Two</span>
					</div>
				</Resizable.Pane>
				<Resizable.Handle />
				<Resizable.Pane defaultSize={75}>
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">Three</span>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
	<Resizable.PaneGroup
		direction="horizontal"
		class="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
	>
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Sidebar</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={75}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Content</span>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
	<Resizable.PaneGroup
		direction="vertical"
		class="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
	>
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Header</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane defaultSize={75}>
			<div class="flex h-full items-center justify-center p-6">
				<span class="font-semibold">Content</span>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
