<script lang="ts">
	import { VisXYContainer, VisGroupedBar, VisLine } from "@unovis/svelte";
	import { config } from "@/stores";
	import { themes } from "@/registry";
	import { modeCurrent } from "$components/docs/light-switch/light-switch";

	const activeTheme = themes.find((theme) => theme.name === $config.theme);

	const data = [
		{
			id: 1,
			revenue: 10400
		},
		{
			id: 2,
			revenue: 14405
		},
		{
			id: 3,
			revenue: 9400
		},
		{
			id: 4,
			revenue: 8200
		},
		{
			id: 5,
			revenue: 7000
		},
		{
			id: 6,
			revenue: 9600
		},
		{
			id: 7,
			revenue: 11244
		},
		{
			id: 8,
			revenue: 26475
		}
	];
	const x = (d: { revenue: number; id: number }) => d.id;
	const y = (d: { revenue: number; id: number }) => d.revenue;
	const color = () => {
		if (activeTheme) {
			return `hsl(${
				activeTheme.cssVars[$modeCurrent ? "light" : "dark"]["primary"]
			}`;
		}

		return `hsl(${
			themes[0].cssVars[$modeCurrent ? "light" : "dark"]["primary"]
		}`;
	};
</script>

<VisXYContainer {data}>
	<VisLine {x} {y} {color} />
</VisXYContainer>
