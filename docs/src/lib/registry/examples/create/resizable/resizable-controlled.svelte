<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Resizable from "$lib/registry/ui/resizable/index.js";

	let sizes = $state([30, 70]);
</script>

<Example title="Controlled">
	<Resizable.PaneGroup
		direction="horizontal"
		class="min-h-[200px] rounded-lg border"
		onLayoutChange={(newSizes) => {
			sizes = newSizes;
		}}
	>
		<Resizable.Pane defaultSize={30} minSize={20}>
			<div class="flex h-full flex-col items-center justify-center gap-2 p-6">
				<span class="font-semibold">{Math.round(sizes[0] ?? 30)}%</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle />
		<Resizable.Pane defaultSize={70} minSize={30}>
			<div class="flex h-full flex-col items-center justify-center gap-2 p-6">
				<span class="font-semibold">{Math.round(sizes[1] ?? 70)}%</span>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</Example>
