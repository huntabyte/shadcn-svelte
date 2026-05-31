<script lang="ts">
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
	import ResizableHorizontal from "./resizable-horizontal.svelte";
	import ResizableVertical from "./resizable-vertical.svelte";
	import ResizableWithHandle from "./resizable-with-handle.svelte";
	import ResizableNested from "./resizable-nested.svelte";
	import ResizableControlled from "./resizable-controlled.svelte";
</script>

<ExampleWrapper>
	<ResizableHorizontal />
	<ResizableVertical />
	<ResizableWithHandle />
	<ResizableNested />
	<ResizableControlled />
</ExampleWrapper>
