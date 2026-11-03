<script lang="ts">
	import ResizableControlled from "./resizable-controlled.svelte";
	import ResizableHorizontal from "./resizable-horizontal.svelte";
	import ResizableNested from "./resizable-nested.svelte";
	import ResizableVertical from "./resizable-vertical.svelte";
	import ResizableWithHandle from "./resizable-with-handle.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ResizableHorizontal />
	<ResizableVertical />
	<ResizableWithHandle />
	<ResizableNested />
	<ResizableControlled />
</ExampleWrapper>
