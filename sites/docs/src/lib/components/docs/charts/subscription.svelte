<script lang="ts">
	import { VisGroupedBar, VisXYContainer } from "@unovis/svelte";
	import { color } from "./helpers.js";

	const data = [
		{
			id: 1,
			subscription: 240,
		},
		{
			id: 2,
			subscription: 300,
		},
		{
			id: 3,
			subscription: 200,
		},
		{
			id: 4,
			subscription: 278,
		},
		{
			id: 5,
			subscription: 189,
		},
		{
			id: 6,
			subscription: 239,
		},
		{
			id: 7,
			subscription: 278,
		},
		{
			id: 8,
			subscription: 189,
		},
	];
	const x = (d: { subscription: number; id: number }) => d.id;
	const y = (d: { subscription: number; id: number }) => d.subscription;
</script>

<VisXYContainer {data} height={80}>
	<VisGroupedBar {x} {y} roundedCorners={4} color={color()} />
</VisXYContainer>
