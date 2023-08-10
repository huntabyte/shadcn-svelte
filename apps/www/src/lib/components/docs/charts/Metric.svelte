<script lang="ts">
	import { VisXYContainer, VisLine } from "@unovis/svelte";
	import { colorArray } from "./helpers";

	type Data = { average: number; today: number; id: number };
	const data: Data[] = [
		{
			id: 1,
			average: 400,
			today: 240
		},
		{
			id: 2,
			average: 300,
			today: 139
		},
		{
			id: 3,
			average: 200,
			today: 980
		},
		{
			id: 4,
			average: 278,
			today: 390
		},
		{
			id: 5,
			average: 189,
			today: 480
		},
		{
			id: 6,
			average: 239,
			today: 380
		},
		{
			id: 7,
			average: 349,
			today: 430
		}
	];
	const x = (d: Data) => d.id;
	const y = [(d: Data) => d.today, (d: Data) => d.average];
</script>

<VisXYContainer {data} height={200}>
	<VisLine {x} {y} color={colorArray()} />
</VisXYContainer>
