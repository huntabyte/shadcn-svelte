<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import { useCreateSearchParams } from "../../routes/(app)/(layout)/(create)/lib/search-params.js";
	import {
		buildRegistryTheme,
		DEFAULT_CONFIG,
		RADII,
		type DesignSystemConfig,
	} from "$lib/registry/config.js";
	import { styleToCSS } from "svelte-toolbelt";

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const params = useCreateSearchParams();

	const radius = $derived(
		RADII.find((radius) => radius.name === params.radius)?.value ?? RADII[0].value
	);

	const registryTheme = $derived.by(() => {
		if (!params.baseColor || !params.theme || !params.menuAccent || !radius) {
			return null;
		}

		const config: DesignSystemConfig = {
			...DEFAULT_CONFIG,
			baseColor: params.baseColor,
			theme: params.theme,
			menuAccent: params.menuAccent,
			radius: params.radius,
		};

		return buildRegistryTheme(config);
	});

	const style = $derived(
		styleToCSS({
			display: "contents",

			// Theme
			"--radius": radius,

			":root": {
				...registryTheme?.cssVars?.light,
				...registryTheme?.cssVars?.theme,
			},
			".dark": {
				...registryTheme?.cssVars?.dark,
			},
		})
	);

	// TODO: fonts
</script>

<div {style} class={cn(`style-${params.style} base-color-${params.baseColor}`)}>
	{@render children?.()}
</div>
