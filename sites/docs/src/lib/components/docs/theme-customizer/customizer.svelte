<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import InfoCircled from "svelte-radix/InfoCircled.svelte";
	import Moon from "svelte-radix/Moon.svelte";
	import Reset from "svelte-radix/Reset.svelte";
	import Sun from "svelte-radix/Sun.svelte";

	import { mode, setMode } from "mode-watcher";
	import { config } from "$lib/stores/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { ThemeWrapper } from "$lib/components/docs/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import { themes } from "$lib/registry/index.js";
</script>

<ThemeWrapper defaultTheme="zinc" class="flex flex-col space-y-4 md:space-y-6">
	<div class="flex items-start">
		<div class="space-y-1 pr-2">
			<div class="font-semibold leading-none tracking-tight">Customize</div>
			<div class="text-muted-foreground text-xs">
				Pick a style and color for your components.
			</div>
		</div>
		<Button
			variant="ghost"
			size="icon"
			class="ml-auto rounded-[0.5rem]"
			on:click={() => {
				$config.radius = 0.5;
				$config.theme = "zinc";
			}}
		>
			<Reset />
			<span class="sr-only"> Reset </span>
		</Button>
	</div>
	<div class="flex flex-1 flex-col space-y-4 md:space-y-6">
		<div class="5 space-y-1">
			<div class="flex w-full items-center">
				<Label class="text-xs">Style</Label>
				<Popover.Root>
					<Popover.Trigger>
						<InfoCircled class="ml-1 h-3 w-3" />
						<span class="sr-only">About styles</span>
					</Popover.Trigger>
					<Popover.Content
						class="space-y-3 rounded-[0.5rem] text-sm"
						align="start"
						side="right"
						sideOffset={-20}
					>
						<p class="font-medium">
							What is the difference between the New York and Default style?
						</p>
						<p>
							A style comes with its own set of components, animations, icons and
							more.
						</p>
						<p>
							The <span class="font-medium">Default</span> style has larger inputs, uses
							lucide-svelte for icons.
						</p>
						<p>
							The <span class="font-medium">New York</span> style ships with smaller buttons
							and cards with shadows. It uses icons from Radix Icons.
						</p>
					</Popover.Content>
				</Popover.Root>
			</div>
			<div class="grid grid-cols-3 gap-2">
				<Button
					variant="outline"
					size="sm"
					on:click={() => ($config.style = "default")}
					class={cn($config.style === "default" && "border-primary border-2")}
				>
					Default
				</Button>
				<Button
					variant="outline"
					size="sm"
					on:click={() => ($config.style = "new-york")}
					class={cn($config.style === "new-york" && "border-primary border-2")}
				>
					New York
				</Button>
			</div>
		</div>
		<div class="5 space-y-1">
			<Label class="text-xs">Color</Label>
			<div class="grid grid-cols-3 gap-2">
				{#each themes as theme (theme.name)}
					{@const isActive = $config.theme === theme.name}
					<Button
						variant="outline"
						size="sm"
						on:click={() => {
							$config.theme = theme.name;
						}}
						class={cn("justify-start", isActive && "border-primary border-2")}
						style="--theme-primary: hsl({theme.activeColor[$mode ?? 'dark']})"
					>
						<span
							class="mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]"
						>
							{#if isActive}
								<Check class="h-4 w-4 text-white" />
							{/if}
						</span>
						{theme.label}
					</Button>
				{/each}
			</div>
		</div>
		<div class="space-y-1.5">
			<Label class="text-xs">Radius</Label>
			<div class="grid grid-cols-5 gap-2">
				{#each ["0", "0.3", "0.5", "0.75", "1.0"] as value, _ (value)}
					{@const valueFloat = Number.parseFloat(value)}
					<Button
						variant="outline"
						size="sm"
						on:click={() => {
							$config.radius = valueFloat;
						}}
						class={cn($config.radius === valueFloat && "border-primary border-2")}
					>
						{value}
					</Button>
				{/each}
			</div>
		</div>
		<div class="space-y-1.5">
			<Label class="text-xs">Mode</Label>
			<div class="grid grid-cols-3 gap-2">
				<Button
					variant="outline"
					size="sm"
					on:click={() => setMode("light")}
					class={cn($mode === "light" && "border-primary border-2")}
				>
					<Sun class="mr-1 -translate-x-1" />
					Light
				</Button>
				<Button
					variant="outline"
					size="sm"
					on:click={() => setMode("dark")}
					class={cn($mode === "dark" && "border-primary border-2")}
				>
					<Moon class="mr-1 -translate-x-1" />
					Dark
				</Button>
			</div>
		</div>
	</div>
</ThemeWrapper>
