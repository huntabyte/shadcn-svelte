<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		name,
		background,
		foreground,
		class: className,
	}: {
		name: string;
		background: string;
		foreground: string;
		class?: string;
	} = $props();

	type Rgb = [number, number, number];
	let element: HTMLDivElement;
	let info = $state<{ ratio: number; bg: string } | null>(null);

	// Resolve CSS colors (including oklch and color-mix) to sRGB in the browser.
	// Composite translucent colors over their backdrop.
	function toRgb(color: string, backdrop = "#fff"): Rgb | null {
		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = 1;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		if (!context) return null;
		context.fillStyle = backdrop;
		context.fillRect(0, 0, 1, 1);
		context.fillStyle = color;
		context.fillRect(0, 0, 1, 1);
		const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
		return [r, g, b];
	}

	function toHex(rgb: Rgb) {
		return `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
	}

	function luminance(rgb: Rgb) {
		const [r, g, b] = rgb.map((value) => {
			const channel = value / 255;
			return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	function contrast(a: Rgb, b: Rgb) {
		const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (light + 0.05) / (dark + 0.05);
	}

	$effect(() => {
		// Re-run after prop updates as well as ancestor theme changes.
		background;
		foreground;
		className;
		if (!element) return;

		const ancestors: HTMLElement[] = [];
		for (let parent = element.parentElement; parent; parent = parent.parentElement) {
			ancestors.push(parent);
		}

		const measure = () => {
			const style = getComputedStyle(element);
			let backdrop = "#fff";
			for (const ancestor of [...ancestors].reverse()) {
				const rgb = toRgb(getComputedStyle(ancestor).backgroundColor, backdrop);
				if (rgb) backdrop = toHex(rgb);
			}
			const bg = toRgb(style.backgroundColor, backdrop);
			const fg = bg && toRgb(style.color, toHex(bg));
			info = bg && fg ? { ratio: contrast(bg, fg), bg: toHex(bg) } : null;
		};

		measure();
		const observer = new MutationObserver(measure);
		for (const ancestor of ancestors) {
			observer.observe(ancestor, { attributes: true });
		}
		return () => observer.disconnect();
	});

	const level = $derived(
		!info
			? ""
			: info.ratio >= 7
				? "AAA"
				: info.ratio >= 4.5
					? "AA"
					: info.ratio >= 3
						? "AA Large"
						: "Fail"
	);
</script>

<div class={cn("flex flex-col overflow-hidden rounded-xl border", className)}>
	<div
		bind:this={element}
		style:background-color={`var(--${background})`}
		style:color={`var(--${foreground})`}
		class="flex h-24 items-end justify-between p-4"
	>
		<span class="text-2xl font-medium">Aa</span>
		{#if info}
			<span class="rounded-full border border-current/20 px-2 py-0.5 font-mono text-xs">
				{info.ratio.toFixed(2)}
				{level}
			</span>
		{/if}
	</div>
	<div class="flex flex-col gap-0.5 bg-background p-3">
		<span class="text-sm font-medium">{name}</span>
		<span class="font-mono text-xs text-muted-foreground">
			--{background} / --{foreground}
		</span>
		{#if info}
			<span class="font-mono text-xs text-muted-foreground">{info.bg}</span>
		{/if}
	</div>
</div>
