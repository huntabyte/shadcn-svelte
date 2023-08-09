<script lang="ts">
	import { VisXYContainer, VisGroupedBar, VisLine } from "@unovis/svelte";
	import { config } from "@/stores";
	import { themes } from "@/registry";
	import { modeCurrent } from "$components/docs/light-switch/light-switch";

	const activeTheme = themes.find((theme) => theme.name === $config.theme);

	const data = [
		{
			id: 1,
			subscription: 240
		},
		{
			id: 2,
			subscription: 300
		},
		{
			id: 3,
			subscription: 200
		},
		{
			id: 4,
			subscription: 278
		},
		{
			id: 5,
			subscription: 189
		},
		{
			id: 6,
			subscription: 239
		},
		{
			id: 7,
			subscription: 278
		},
		{
			id: 8,
			subscription: 189
		}
	];
	const x = (d: { subscription: number; id: number }) => d.id;
	const y = (d: { subscription: number; id: number }) => d.subscription;
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
	<VisGroupedBar {x} {y} {color} roundedCorners={4} />
</VisXYContainer>
