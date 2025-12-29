<script lang="ts">
	let { percentage }: { percentage: number } = $props();

	const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
	const circumference = 2 * Math.PI * 42.5;
	const strokePercent = (normalizedPercentage / 100) * circumference;
</script>

<svg
	aria-hidden="true"
	fill="none"
	height="16"
	width="16"
	stroke-width="2"
	viewBox="0 0 100 100"
	class="-rotate-90"
>
	<circle
		cx="50"
		cy="50"
		r="42.5"
		stroke-width="12"
		stroke-dashoffset="0"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="opacity-20"
		stroke="currentColor"
		style="stroke-dasharray: {circumference} {circumference};"
	/>
	<circle
		cx="50"
		cy="50"
		r="42.5"
		stroke-width="12"
		stroke-dashoffset="0"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke="currentColor"
		class="transition-all duration-300"
		style="stroke-dasharray: {strokePercent} {circumference};"
	/>
</svg>
