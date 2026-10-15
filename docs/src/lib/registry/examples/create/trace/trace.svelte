<script lang="ts">
	import TraceChainOfThought from "./trace-chain-of-thought.svelte";
	import TraceChat from "./trace-chat.svelte";
	import TraceReasoning from "./trace-reasoning.svelte";
	import TraceRows from "./trace-rows.svelte";
	import TraceSources from "./trace-sources.svelte";
	import TraceTask from "./trace-task.svelte";
	import TraceToolCalls from "./trace-tool-calls.svelte";
	import TraceTurn from "./trace-turn.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<TraceChat />
	<TraceRows />
	<TraceToolCalls />
	<TraceReasoning />
	<TraceChainOfThought />
	<TraceTask />
	<TraceSources />
	<TraceTurn />
</ExampleWrapper>
