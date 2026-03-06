<script lang="ts" module>
	export type AgentState = "connecting" | "initializing" | "listening" | "speaking" | "thinking";

	type AnimationState = AgentState | undefined;

	function generateConnectingSequenceBar(columns: number): number[][] {
		const seq = [];
		for (let x = 0; x < columns; x++) {
			seq.push([x, columns - 1 - x]);
		}
		return seq;
	}

	function generateListeningSequenceBar(columns: number): number[][] {
		const center = Math.floor(columns / 2);
		const noIndex = -1;
		return [[center], [noIndex]];
	}
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		agentState?: AgentState;
		barCount?: number;
		mediaStream?: MediaStream | null;
		minHeight?: number;
		maxHeight?: number;
		demo?: boolean;
		centerAlign?: boolean;
	}

	let {
		agentState,
		barCount = 15,
		mediaStream = null,
		minHeight = 20,
		maxHeight = 100,
		demo = false,
		centerAlign = false,
		class: className,
		...restProps
	}: Props = $props();

	// Volume bands state
	let volumeBands = $derived<number[]>(new Array(barCount).fill(0.2));
	let highlightedIndices = $state<number[]>([]);

	// Animation frame IDs for cleanup
	let volumeAnimationId: number | undefined;
	let barAnimationId: number | null = null;

	// Audio analysis for real audio
	function createAudioAnalyser(stream: MediaStream) {
		const AudioContextConstructor =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		const audioContext = new AudioContextConstructor();
		const source = audioContext.createMediaStreamSource(stream);
		const analyser = audioContext.createAnalyser();

		analyser.fftSize = 2048;

		source.connect(analyser);

		const cleanup = () => {
			source.disconnect();
			audioContext.close();
		};

		return { analyser, audioContext, cleanup };
	}

	// Multiband volume processing
	function normalizeDb(value: number): number {
		if (value === -Infinity) return 0;
		const minDb = -100;
		const maxDb = -10;
		const db = 1 - (Math.max(minDb, Math.min(maxDb, value)) * -1) / 100;
		return Math.sqrt(db);
	}

	// Real audio volume tracking
	$effect(() => {
		if (demo || !mediaStream) {
			return;
		}

		const bands = barCount;
		const loPass = 100;
		const hiPass = 200;
		const updateInterval = 32;

		const { analyser, cleanup } = createAudioAnalyser(mediaStream);
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Float32Array(bufferLength);
		const sliceStart = loPass;
		const sliceEnd = hiPass;
		const sliceLength = sliceEnd - sliceStart;
		const chunkSize = Math.ceil(sliceLength / bands);

		let lastUpdate = 0;

		const updateVolume = (timestamp: number) => {
			if (timestamp - lastUpdate >= updateInterval) {
				analyser.getFloatFrequencyData(dataArray);

				const chunks = new Array(bands);

				for (let i = 0; i < bands; i++) {
					let sum = 0;
					let count = 0;
					const startIdx = sliceStart + i * chunkSize;
					const endIdx = Math.min(sliceStart + (i + 1) * chunkSize, sliceEnd);

					for (let j = startIdx; j < endIdx; j++) {
						sum += normalizeDb(dataArray[j]);
						count++;
					}

					chunks[i] = count > 0 ? sum / count : 0;
				}

				volumeBands = chunks;
				lastUpdate = timestamp;
			}

			volumeAnimationId = requestAnimationFrame(updateVolume);
		};

		volumeAnimationId = requestAnimationFrame(updateVolume);

		return () => {
			cleanup();
			if (volumeAnimationId) {
				cancelAnimationFrame(volumeAnimationId);
			}
		};
	});

	// Fake volume animation for demo mode
	$effect(() => {
		if (!demo) return;

		if (agentState !== "speaking" && agentState !== "listening") {
			volumeBands = new Array(barCount).fill(0.2);
			return;
		}

		const startTime = Date.now() / 1000;
		const updateInterval = 50;
		let lastUpdate = 0;

		const updateFakeVolume = (timestamp: number) => {
			if (timestamp - lastUpdate >= updateInterval) {
				const time = Date.now() / 1000 - startTime;
				const newBands = new Array(barCount);

				for (let i = 0; i < barCount; i++) {
					const waveOffset = i * 0.5;
					const baseVolume = Math.sin(time * 2 + waveOffset) * 0.3 + 0.5;
					const randomNoise = Math.random() * 0.2;
					newBands[i] = Math.max(0.1, Math.min(1, baseVolume + randomNoise));
				}

				volumeBands = newBands;
				lastUpdate = timestamp;
			}

			volumeAnimationId = requestAnimationFrame(updateFakeVolume);
		};

		volumeAnimationId = requestAnimationFrame(updateFakeVolume);

		return () => {
			if (volumeAnimationId) {
				cancelAnimationFrame(volumeAnimationId);
			}
		};
	});

	// Bar animation sequencing
	$effect(() => {
		const animState = agentState as AnimationState;
		let sequence: number[][];

		if (animState === "thinking" || animState === "listening") {
			sequence = generateListeningSequenceBar(barCount);
		} else if (animState === "connecting" || animState === "initializing") {
			sequence = generateConnectingSequenceBar(barCount);
		} else if (animState === undefined || animState === "speaking") {
			sequence = [new Array(barCount).fill(0).map((_, idx) => idx)];
		} else {
			sequence = [[]];
		}

		const interval =
			animState === "connecting"
				? 2000 / barCount
				: animState === "thinking"
					? 150
					: animState === "listening"
						? 500
						: 1000;

		let indexRef = 0;
		highlightedIndices = sequence[0] || [];

		let startTime = performance.now();

		const animate = (time: number) => {
			const timeElapsed = time - startTime;

			if (timeElapsed >= interval) {
				indexRef = (indexRef + 1) % sequence.length;
				highlightedIndices = sequence[indexRef] || [];
				startTime = time;
			}

			barAnimationId = requestAnimationFrame(animate);
		};

		barAnimationId = requestAnimationFrame(animate);

		return () => {
			if (barAnimationId !== null) {
				cancelAnimationFrame(barAnimationId);
			}
		};
	});
</script>

<div
	data-state={agentState}
	class={cn(
		"relative flex justify-center gap-1.5",
		centerAlign ? "items-center" : "items-end",
		"bg-muted h-32 w-full overflow-hidden rounded-lg p-4",
		className
	)}
	{...restProps}
>
	{#each volumeBands as volume, index (index)}
		{@const heightPct = Math.min(maxHeight, Math.max(minHeight, volume * 100 + 5))}
		{@const isHighlighted = highlightedIndices?.includes(index) ?? false}
		<div
			data-highlighted={isHighlighted}
			class={cn(
				"max-w-[12px] min-w-[8px] flex-1 transition-all duration-150",
				"rounded-full",
				"bg-border data-[highlighted=true]:bg-primary",
				agentState === "speaking" && "bg-primary",
				agentState === "thinking" && isHighlighted && "animate-pulse"
			)}
			style="height: {heightPct}%; {agentState === 'thinking'
				? 'animation-duration: 300ms;'
				: ''}"
		></div>
	{/each}
</div>
