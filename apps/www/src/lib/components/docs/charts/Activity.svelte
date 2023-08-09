<script lang="ts">
	import {
		VisXYContainer,
		VisGroupedBar,
		VisSingleContainer
	} from "@unovis/svelte";
	import { config } from "@/stores";
	import { themes } from "@/registry";
	import { modeCurrent } from "$components/docs/light-switch/light-switch";

	const activeTheme = themes.find((theme) => theme.name === $config.theme);

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
	const color = () => {
		if (activeTheme) {
			return `hsl(${
				activeTheme.cssVars[$modeCurrent ? "light" : "dark"]["primary"]
			} / .2`;
		}

		return `hsl(${
			themes[0].cssVars[$modeCurrent ? "light" : "dark"]["primary"]
		} / .2`;
	};
</script>

<VisXYContainer {data} height={60}>
	<VisGroupedBar {x} {y} {color} />
</VisXYContainer>
