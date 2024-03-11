<script lang="ts">
	import { VisXYContainer, VisLine, VisTooltip, VisScatter, VisCrosshair } from "@unovis/svelte";
	import {
		lineColors,
		type Data,
		scatterPointColors,
		scatterPointStrokeColors,
		tooltipTemplate,
		crosshairPointColors,
		crosshairStrokeWidths,
	} from "./helpers.js";

	const data: Data[] = [
		{ id: 1, average: 400, today: 240 },
		{ id: 2, average: 300, today: 139 },
		{ id: 3, average: 200, today: 980 },
		{ id: 4, average: 278, today: 390 },
		{ id: 5, average: 189, today: 480 },
		{ id: 6, average: 239, today: 380 },
		{ id: 7, average: 349, today: 430 },
	];

	const x = (d: Data) => d.id;
	const y = [(d: Data) => d.today, (d: Data) => d.average];
</script>

<VisXYContainer
	class="vis-xy-container"
	{data}
	height={200}
	margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
>
	<VisTooltip />
	<VisLine {x} {y} lineWidth={1} color={lineColors} />
	<VisScatter
		{x}
		{y}
		color={scatterPointColors}
		size={6}
		strokeColor={scatterPointStrokeColors}
		strokeWidth={crosshairStrokeWidths}
	/>
	<VisCrosshair template={tooltipTemplate} color={crosshairPointColors} />
</VisXYContainer>

<style lang="postcss">
	:global(.vis-xy-container) {
		--vis-tooltip-padding: "0px";
		--vis-tooltip-background-color: "transparent";
		--vis-tooltip-border-color: "transparent";
	}
</style>
