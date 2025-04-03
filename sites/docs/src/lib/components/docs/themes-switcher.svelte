<script lang="ts">
	import { MediaQuery } from "svelte/reactivity";
	import { mode } from "mode-watcher";
	import { THEMES, type Theme } from "$lib/themes.js";
	import { cn } from "$lib/utils.js";
	import { themesConfig } from "$lib/stores/themes-config.js";
	import { IsMounted } from "runed";

	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";

	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		themes = THEMES,
		class: className,
	}: HTMLAttributes<HTMLDivElement> & {
		themes?: Theme[];
	} = $props();

	const isDesktop = new MediaQuery("min-width: 1024px");
	const mounted = new IsMounted();
</script>

{#if !mounted.current}
	<div
		class={cn(
			"flex items-center justify-center gap-0.5 py-4 lg:flex-col lg:justify-start lg:gap-1",
			className
		)}
	>
		{#each themes as theme (theme.id)}
			<div
				class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-transparent"
			>
				<Skeleton class="h-6 w-6 rounded-sm" />
			</div>
		{/each}
	</div>
{:else}
	<ToggleGroup.Root
		type="single"
		value={themesConfig.current.activeTheme.name}
		onValueChange={(value) => {
			const theme = themes.find((theme) => theme.name === value);
			if (!theme) return;
			themesConfig.current.activeTheme = theme;
		}}
		class={cn(
			"flex items-center justify-center gap-0.5 self-start py-4 lg:flex-col lg:justify-start lg:gap-1",
			className
		)}
	>
		{#each themes as theme (theme.name)}
			{@const isActive = theme.name === themesConfig.current.activeTheme.name}
			{@const isDarkTheme = ["Midnight"].includes(theme.name)}
			{@const cssVars =
				mounted.current && $mode === "dark" ? theme.cssVars.dark : theme.cssVars.light}
			{@const styles = {
				...cssVars,
			} as const}
			{@const stylesRight = {
				"--color-1": "var(--chart-1)",
				"--color-2": "var(--chart-2)",
				"--color-3": "var(--chart-3)",
				"--color-4": "var(--chart-4)",
			}}
			{@const styleA = Object.keys(styles).map(
				(key) => `${key}: hsla(${styles[key as keyof typeof styles]});`
			)}
			{@const styleB = Object.keys(stylesRight).map(
				(key) => `${key}: ${stylesRight[key as keyof typeof stylesRight]};`
			)}
			{@const style = styleA.concat(styleB).join("")}

			<Tooltip.Root>
				<Tooltip.Trigger
					class={cn(
						"group flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-transparent p-0 hover:bg-transparent focus-visible:bg-transparent aria-checked:border-[var(--color-1)] data-[state=on]:bg-transparent",
						mounted.current && isDarkTheme && $mode !== "dark" ? "invert-[1]" : ""
					)}
					{style}
				>
					{#snippet child({ props })}
						<ToggleGroup.Item {...props} value={theme.name}>
							<div class="h-6 w-6 overflow-hidden rounded-sm">
								<div
									class={cn(
										"grid h-12 w-12 -translate-x-1/4 -translate-y-1/4 grid-cols-2 overflow-hidden rounded-md transition-all ease-in-out group-hover:rotate-45",
										isActive ? "rotate-45 group-hover:rotate-0" : "rotate-0"
									)}
								>
									<span class="flex h-6 w-6 bg-[var(--color-1)]"></span>
									<span class="flex h-6 w-6 bg-[var(--color-2)]"></span>
									<span class="flex h-6 w-6 bg-[var(--color-3)]"></span>
									<span class="flex h-6 w-6 bg-[var(--color-4)]"></span>
									<span class="sr-only">{theme.name}</span>
								</div>
							</div>
						</ToggleGroup.Item>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content side={isDesktop ? "left" : "top"}>
					{theme.name}
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</ToggleGroup.Root>
{/if}
