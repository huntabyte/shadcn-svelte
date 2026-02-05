<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import BarVisualizer, { type AgentState } from "./bar-visualizer.svelte";

	let agentState: AgentState = $state("speaking");
</script>

<Example title="Bar Visualizer">
	<Card.Root>
		<Card.Header>
			<Card.Title>Audio Frequency Visualizer</Card.Title>
			<Card.Description>
				Real-time frequency band visualization with animated state transitions
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<BarVisualizer
				{agentState}
				demo={true}
				barCount={20}
				minHeight={15}
				maxHeight={90}
				class="h-40 max-w-full"
			/>
		</Card.Content>
		<Card.Footer class="gap-2">
			<Button
				size="sm"
				variant={agentState === "connecting" ? "default" : "outline"}
				onclick={() => (agentState = "connecting")}
			>
				Connecting
			</Button>
			<Button
				size="sm"
				variant={agentState === "listening" ? "default" : "outline"}
				onclick={() => (agentState = "listening")}
			>
				Listening
			</Button>
			<Button
				size="sm"
				variant={agentState === "speaking" ? "default" : "outline"}
				onclick={() => (agentState = "speaking")}
			>
				Speaking
			</Button>
		</Card.Footer>
	</Card.Root>
</Example>
