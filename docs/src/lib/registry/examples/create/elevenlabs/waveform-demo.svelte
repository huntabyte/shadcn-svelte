<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import LiveWaveform from "./live-waveform.svelte";

	let active = $state(false);
	let processing = $state(true);
	let mode = $state<"static" | "scrolling">("static");

	function handleToggleActive() {
		active = !active;
		if (active) {
			processing = false;
		}
	}

	function handleToggleProcessing() {
		processing = !processing;
		if (processing) {
			active = false;
		}
	}
</script>

<Example title="Waveform" class="items-center justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Live Audio Waveform</Card.Title>
			<Card.Description>
				Real-time microphone input visualization with audio reactivity
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<LiveWaveform
				{active}
				{processing}
				height={80}
				barWidth={3}
				barGap={2}
				{mode}
				fadeEdges={true}
				barColor="gray"
				historySize={120}
			/>
		</Card.Content>
		<Card.Footer class="gap-2">
			<Button size="sm" variant={active ? "default" : "outline"} onclick={handleToggleActive}>
				{active ? "Stop" : "Start"} Listening
			</Button>
			<Button
				size="sm"
				variant={processing ? "default" : "outline"}
				onclick={handleToggleProcessing}
			>
				{processing ? "Stop" : "Start"} Processing
			</Button>
			<Button
				size="sm"
				variant="outline"
				onclick={() => (mode = mode === "static" ? "scrolling" : "static")}
			>
				{mode === "static" ? "Static" : "Scrolling"}
			</Button>
		</Card.Footer>
	</Card.Root>
</Example>
