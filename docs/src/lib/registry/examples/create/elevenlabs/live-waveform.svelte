<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { onMount } from "svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		active?: boolean;
		processing?: boolean;
		deviceId?: string;
		barWidth?: number;
		barHeight?: number;
		barGap?: number;
		barRadius?: number;
		barColor?: string;
		fadeEdges?: boolean;
		fadeWidth?: number;
		height?: string | number;
		sensitivity?: number;
		smoothingTimeConstant?: number;
		fftSize?: number;
		historySize?: number;
		updateRate?: number;
		mode?: "scrolling" | "static";
		onError?: (error: Error) => void;
		onStreamReady?: (stream: MediaStream) => void;
		onStreamEnd?: () => void;
	}

	let {
		active = false,
		processing = false,
		deviceId,
		barWidth = 3,
		barGap = 1,
		barRadius = 1.5,
		barColor,
		fadeEdges = true,
		fadeWidth = 24,
		barHeight: baseBarHeight = 4,
		height = 64,
		sensitivity = 1,
		smoothingTimeConstant = 0.8,
		fftSize = 256,
		historySize = 60,
		updateRate = 30,
		mode = "static",
		onError,
		onStreamReady,
		onStreamEnd,
		class: className,
		...restProps
	}: Props = $props();

	let canvasRef: HTMLCanvasElement;
	let containerRef: HTMLDivElement;

	// Refs for animation state
	let history: number[] = [];
	let analyser: AnalyserNode | null = null;
	let audioContext: AudioContext | null = null;
	let stream: MediaStream | null = null;
	let animationId = 0;
	let lastUpdate = 0;
	let processingAnimationId: number | null = null;
	let lastActiveData: number[] = [];
	let transitionProgress = 0;
	let staticBars: number[] = [];
	let needsRedraw = true;
	let gradientCache: CanvasGradient | null = null;
	let lastWidth = 0;

	const heightStyle = typeof height === "number" ? `${height}px` : height;

	onMount(() => {
		// Handle canvas resizing
		const resizeObserver = new ResizeObserver(() => {
			if (!canvasRef || !containerRef) return;
			const rect = containerRef.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			canvasRef.width = rect.width * dpr;
			canvasRef.height = rect.height * dpr;
			canvasRef.style.width = `${rect.width}px`;
			canvasRef.style.height = `${rect.height}px`;
			const ctx = canvasRef.getContext("2d");
			if (ctx) {
				ctx.scale(dpr, dpr);
			}
			gradientCache = null;
			lastWidth = rect.width;
			needsRedraw = true;
		});

		resizeObserver.observe(containerRef);

		return () => {
			resizeObserver.disconnect();
		};
	});

	// Handle processing animation (when not active but processing)
	$effect(() => {
		if (processing && !active) {
			let time = 0;
			transitionProgress = 0;

			const animateProcessing = () => {
				time += 0.03;
				transitionProgress = Math.min(1, transitionProgress + 0.02);

				const processingData: number[] = [];
				const barCount = Math.floor(
					(containerRef?.getBoundingClientRect().width || 200) / (barWidth + barGap)
				);

				if (mode === "static") {
					const halfCount = Math.floor(barCount / 2);
					for (let i = 0; i < barCount; i++) {
						const normalizedPosition = (i - halfCount) / halfCount;
						const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4;
						const wave1 = Math.sin(time * 1.5 + normalizedPosition * 3) * 0.25;
						const wave2 = Math.sin(time * 0.8 - normalizedPosition * 2) * 0.2;
						const wave3 = Math.cos(time * 2 + normalizedPosition) * 0.15;
						const combinedWave = wave1 + wave2 + wave3;
						const processingValue = (0.2 + combinedWave) * centerWeight;

						let finalValue = processingValue;
						if (lastActiveData.length > 0 && transitionProgress < 1) {
							const lastDataIndex = Math.min(i, lastActiveData.length - 1);
							const lastValue = lastActiveData[lastDataIndex] || 0;
							finalValue =
								lastValue * (1 - transitionProgress) +
								processingValue * transitionProgress;
						}
						processingData.push(Math.max(0.05, Math.min(1, finalValue)));
					}
				} else {
					for (let i = 0; i < barCount; i++) {
						const normalizedPosition = (i - barCount / 2) / (barCount / 2);
						const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4;
						const wave1 = Math.sin(time * 1.5 + i * 0.15) * 0.25;
						const wave2 = Math.sin(time * 0.8 - i * 0.1) * 0.2;
						const wave3 = Math.cos(time * 2 + i * 0.05) * 0.15;
						const combinedWave = wave1 + wave2 + wave3;
						const processingValue = (0.2 + combinedWave) * centerWeight;

						let finalValue = processingValue;
						if (lastActiveData.length > 0 && transitionProgress < 1) {
							const lastDataIndex = Math.floor(
								(i / barCount) * lastActiveData.length
							);
							const lastValue = lastActiveData[lastDataIndex] || 0;
							finalValue =
								lastValue * (1 - transitionProgress) +
								processingValue * transitionProgress;
						}
						processingData.push(Math.max(0.05, Math.min(1, finalValue)));
					}
				}

				if (mode === "static") {
					staticBars = processingData;
				} else {
					history = processingData;
				}
				needsRedraw = true;
				processingAnimationId = requestAnimationFrame(animateProcessing);
			};

			animateProcessing();

			return () => {
				if (processingAnimationId) {
					cancelAnimationFrame(processingAnimationId);
				}
			};
		} else if (!active && !processing) {
			// Fade to idle
			const hasData = mode === "static" ? staticBars.length > 0 : history.length > 0;

			if (hasData) {
				let fadeProgress = 0;

				const fadeToIdle = () => {
					fadeProgress += 0.03;
					if (fadeProgress < 1) {
						if (mode === "static") {
							staticBars = staticBars.map((value) => value * (1 - fadeProgress));
						} else {
							history = history.map((value) => value * (1 - fadeProgress));
						}
						needsRedraw = true;
						requestAnimationFrame(fadeToIdle);
					} else {
						if (mode === "static") {
							staticBars = [];
						} else {
							history = [];
						}
					}
				};

				fadeToIdle();
			}
		}
	});

	// Handle microphone setup and teardown
	$effect(() => {
		if (!active) {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
				stream = null;
				onStreamEnd?.();
			}
			if (audioContext && audioContext.state !== "closed") {
				audioContext.close();
				audioContext = null;
			}
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = 0;
			}
			return;
		}

		const setupMicrophone = async () => {
			try {
				stream = await navigator.mediaDevices.getUserMedia({
					audio: deviceId
						? {
								deviceId: { exact: deviceId },
								echoCancellation: true,
								noiseSuppression: true,
								autoGainControl: true,
							}
						: {
								echoCancellation: true,
								noiseSuppression: true,
								autoGainControl: true,
							},
				});
				onStreamReady?.(stream);

				const AudioContextConstructor =
					window.AudioContext ||
					(window as unknown as { webkitAudioContext: typeof AudioContext })
						.webkitAudioContext;
				audioContext = new AudioContextConstructor();
				analyser = audioContext.createAnalyser();
				analyser.fftSize = fftSize;
				analyser.smoothingTimeConstant = smoothingTimeConstant;

				const source = audioContext.createMediaStreamSource(stream);
				source.connect(analyser);

				// Clear history when starting
				history = [];
			} catch (error) {
				onError?.(error as Error);
			}
		};

		setupMicrophone();

		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
				stream = null;
				onStreamEnd?.();
			}
			if (audioContext && audioContext.state !== "closed") {
				audioContext.close();
				audioContext = null;
			}
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = 0;
			}
		};
	});

	// Animation loop
	$effect(() => {
		if (!canvasRef) return;

		const ctx = canvasRef.getContext("2d");
		if (!ctx) return;

		let rafId: number;

		const animate = (currentTime: number) => {
			const rect = canvasRef.getBoundingClientRect();

			// Update audio data if active
			if (active && currentTime - lastUpdate > updateRate) {
				lastUpdate = currentTime;
				if (analyser) {
					const dataArray = new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteFrequencyData(dataArray);

					if (mode === "static") {
						// For static mode, update bars in place
						const startFreq = Math.floor(dataArray.length * 0.05);
						const endFreq = Math.floor(dataArray.length * 0.4);
						const relevantData = dataArray.slice(startFreq, endFreq);
						const barCount = Math.floor(rect.width / (barWidth + barGap));
						const halfCount = Math.floor(barCount / 2);
						const newBars: number[] = [];

						// Mirror the data for symmetric display
						for (let i = halfCount - 1; i >= 0; i--) {
							const dataIndex = Math.floor((i / halfCount) * relevantData.length);
							const value = Math.min(
								1,
								(relevantData[dataIndex] / 255) * sensitivity
							);
							newBars.push(Math.max(0.05, value));
						}
						for (let i = 0; i < halfCount; i++) {
							const dataIndex = Math.floor((i / halfCount) * relevantData.length);
							const value = Math.min(
								1,
								(relevantData[dataIndex] / 255) * sensitivity
							);
							newBars.push(Math.max(0.05, value));
						}

						staticBars = newBars;
						lastActiveData = newBars;
					} else {
						// Scrolling mode - original behavior
						let sum = 0;
						const startFreq = Math.floor(dataArray.length * 0.05);
						const endFreq = Math.floor(dataArray.length * 0.4);
						const relevantData = dataArray.slice(startFreq, endFreq);

						for (let i = 0; i < relevantData.length; i++) {
							sum += relevantData[i];
						}
						const average = (sum / relevantData.length / 255) * sensitivity;

						// Add to history
						history.push(Math.min(1, Math.max(0.05, average)));
						lastActiveData = [...history];

						// Maintain history size
						if (history.length > historySize) {
							history.shift();
						}
					}
					needsRedraw = true;
				}
			}

			// Only redraw if needed
			if (!needsRedraw && !active) {
				rafId = requestAnimationFrame(animate);
				return;
			}
			needsRedraw = active;

			ctx.clearRect(0, 0, rect.width, rect.height);

			const computedBarColor =
				barColor ||
				(() => {
					const style = getComputedStyle(canvasRef);
					const color = style.color;
					return color || "#000";
				})();

			const step = barWidth + barGap;
			const barCount = Math.floor(rect.width / step);
			const centerY = rect.height / 2;

			// Draw bars based on mode
			if (mode === "static") {
				const dataToRender = processing
					? staticBars
					: active
						? staticBars
						: staticBars.length > 0
							? staticBars
							: [];

				for (let i = 0; i < barCount && i < dataToRender.length; i++) {
					const value = dataToRender[i] || 0.1;
					const x = i * step;
					const barHeightCalc = Math.max(baseBarHeight, value * rect.height * 0.8);
					const y = centerY - barHeightCalc / 2;

					ctx.fillStyle = computedBarColor;
					ctx.globalAlpha = 0.4 + value * 0.6;

					if (barRadius > 0) {
						ctx.beginPath();
						ctx.roundRect(x, y, barWidth, barHeightCalc, barRadius);
						ctx.fill();
					} else {
						ctx.fillRect(x, y, barWidth, barHeightCalc);
					}
				}
			} else {
				// Scrolling mode
				for (let i = 0; i < barCount && i < history.length; i++) {
					const dataIndex = history.length - 1 - i;
					const value = history[dataIndex] || 0.1;
					const x = rect.width - (i + 1) * step;
					const barHeightCalc = Math.max(baseBarHeight, value * rect.height * 0.8);
					const y = centerY - barHeightCalc / 2;

					ctx.fillStyle = computedBarColor;
					ctx.globalAlpha = 0.4 + value * 0.6;

					if (barRadius > 0) {
						ctx.beginPath();
						ctx.roundRect(x, y, barWidth, barHeightCalc, barRadius);
						ctx.fill();
					} else {
						ctx.fillRect(x, y, barWidth, barHeightCalc);
					}
				}
			}

			// Apply edge fading
			if (fadeEdges && fadeWidth > 0 && rect.width > 0) {
				if (!gradientCache || lastWidth !== rect.width) {
					const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
					const fadePercent = Math.min(0.3, fadeWidth / rect.width);

					gradient.addColorStop(0, "rgba(255,255,255,1)");
					gradient.addColorStop(fadePercent, "rgba(255,255,255,0)");
					gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)");
					gradient.addColorStop(1, "rgba(255,255,255,1)");

					gradientCache = gradient;
					lastWidth = rect.width;
				}

				ctx.globalCompositeOperation = "destination-out";
				ctx.fillStyle = gradientCache;
				ctx.fillRect(0, 0, rect.width, rect.height);
				ctx.globalCompositeOperation = "source-over";
			}

			ctx.globalAlpha = 1;
			rafId = requestAnimationFrame(animate);
		};

		rafId = requestAnimationFrame(animate);

		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};
	});
</script>

<div
	class={cn("relative h-full w-full", className)}
	bind:this={containerRef}
	style="height: {heightStyle};"
	aria-label={active
		? "Live audio waveform"
		: processing
			? "Processing audio"
			: "Audio waveform idle"}
	role="img"
	{...restProps}
>
	{#if !active && !processing}
		<div
			class="border-muted-foreground/20 absolute top-1/2 right-0 left-0 -translate-y-1/2 border-t-2 border-dotted"
		></div>
	{/if}
	<canvas class="block h-full w-full" bind:this={canvasRef} aria-hidden="true"></canvas>
</div>
