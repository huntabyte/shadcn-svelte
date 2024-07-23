<script lang="ts">
	import Check from "svelte-radix/Check.svelte";

	import { mode } from "mode-watcher";
	import Paintbrush from "lucide-svelte/icons/paintbrush";
	import { Customizer, ThemeCopyCodeButton } from "./index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Drawer from "$lib/registry/new-york/ui/drawer/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";
	import { config } from "$lib/stores/index.js";
	import { themes } from "$lib/registry/index.js";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

	const colors = ["zinc", "rose", "blue", "green", "orange"];
</script>

<div class="flex items-center space-x-2">
	<div class="mr-2 hidden items-center space-x-0.5 lg:flex">
		{#each colors as color (color)}
			{@const theme = themes.find((theme) => theme.name === color)}
			{@const isActive = $config.theme === color}
			{#if theme}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							style={{
								"--theme-primary": `hsl(${
									theme?.activeColor[$mode === "dark" ? "dark" : "light"]
								}`,
							}}
							class={cn(
								"flex size-9 items-center justify-center rounded-full border-2 text-xs",
								isActive ? "border-[--theme-primary]" : "border-transparent"
							)}
							onclick={() => {
								config.update((prev) => ({
									...prev,
									theme: theme.name,
								}));
							}}
						>
							<span
								class={cn(
									"flex size-6 items-center justify-center rounded-full bg-[--theme-primary]"
								)}
							>
								{#if isActive}
									<Check class="size-4 text-white" />
								{/if}
							</span>
							<span class="sr-only">{theme.label}</span>
						</Tooltip.Trigger>
						<Tooltip.Content
							align="center"
							class="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
						>
							{theme.label}
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
		{/each}
	</div>
	<div class="block md:hidden">
		<Drawer.Root>
			<Drawer.Trigger class={cn(buttonVariants({ variant: "outline" }))}>
				<Paintbrush class="mr-2 size-4" />
				Customize
			</Drawer.Trigger>
			<Drawer.Content class="bg-white p-6 dark:bg-zinc-950">
				<Customizer />
			</Drawer.Content>
		</Drawer.Root>
	</div>
	<div class="hidden md:block">
		<Popover.Root>
			<Popover.Trigger class={cn(buttonVariants({ variant: "outline" }))}>
				<Paintbrush class="mr-2 size-4" />
				Customize
			</Popover.Trigger>
			<Popover.Content
				class="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
				align="end"
			>
				<Customizer />
			</Popover.Content>
		</Popover.Root>
	</div>
	<ThemeCopyCodeButton />
</div>
