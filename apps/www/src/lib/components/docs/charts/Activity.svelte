<script lang="ts">
	import { VisXYContainer, VisGroupedBar } from "@unovis/svelte";
	import { color } from "./helpers";

	const data = [
		{
			id: 1,
			goal: 400
		},
		{
			id: 2,
			goal: 300
		},
		{
			id: 3,
			goal: 200
		},
		{
			id: 4,
			goal: 300
		},
		{
			id: 5,
			goal: 200
		},
		{
			id: 6,
			goal: 278
		},
		{
			id: 7,
			goal: 189
		},
		{
			id: 8,
			goal: 239
		},
		{
			id: 9,
			goal: 300
		},
		{
			id: 10,
			goal: 200
		},
		{
			id: 11,
			goal: 278
		},
		{
			id: 12,
			goal: 189
		},
		{
			id: 13,
			goal: 349
		}
	];
	const x = (d: { goal: number; id: number }) => d.id;
	const y = (d: { goal: number; id: number }) => d.goal;
</script>

<VisXYContainer {data} height={60}>
	<VisGroupedBar {x} {y} color={color("0.2")} />
</VisXYContainer>
