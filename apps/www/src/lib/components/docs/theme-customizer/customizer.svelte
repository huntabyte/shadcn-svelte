<script lang="ts">
	import { config } from "@/stores";
	import { Button } from "@/registry/new-york/ui/button";
	import * as Popover from "@/registry/new-york/ui/popover";
	import { ThemeWrapper } from "@/components/docs";
	import { Check, InfoCircled, Moon, Reset, Sun } from "radix-icons-svelte";
	import { Label } from "@/registry/new-york/ui/label";
	import { cn } from "@/utils";
	import { themes } from "@/registry";
	import {
		modeCurrent,
		setModeCurrent
	} from "@/components/docs/light-switch/light-switch";
</script>

<ThemeWrapper defaultTheme="zinc" class="flex flex-col space-y-4 md:space-y-6">
	<div class="flex items-start">
		<div class="space-y-1 pr-2">
			<div class="font-semibold leading-none tracking-tight">
				Customize
			</div>
			<div class="text-xs text-muted-foreground">
				Pick a style and color for your components.
			</div>
		</div>
		<Button
			variant="ghost"
			size="icon"
			class="ml-auto rounded-[0.5rem]"
			on:click={() => {
				config.update((prev) => ({
					...prev,
					theme: "zinc",
					radius: 0.5
				}));
			}}
		>
			<Reset />
			<span class="sr-only"> Reset </span>
		</Button>
	</div>
	<div class="flex flex-1 flex-col space-y-4 md:space-y-6">
		<div class="space-y-1 5">
			<div class="flex w-full items-center">
				<Label class="text-xs">Style</Label>
				<Popover.Root
					positioning={{ placement: "right-start", gutter: -20 }}
				>
					<Popover.Trigger>
						<InfoCircled class="ml-1 h-3 w-3" />
						<span class="sr-only">About styles</span>
					</Popover.Trigger>
					<Popover.Content class="space-y-3 rounded-[0.5rem] text-sm">
						<p class="font-medium">
							What is the difference between the New York and
							Default style?
						</p>
						<p>
							A style comes with its own set of components,
							animations, icons and more.
						</p>
						<p>
							The <span class="font-medium">Default</span> style has
							larger inputs, uses lucide-svelte for icons.
						</p>
						<p>
							The <span class="font-medium">New York</span> style ships
							with smaller buttons and cards with shadows. It uses
							icons from Radix Icons.
						</p>
					</Popover.Content>
				</Popover.Root>
			</div>
			<div class="grid grid-cols-3 gap-2">
				<Button
					variant="outline"
					size="sm"
					on:click={() =>
						config.update((prev) => ({
							...prev,
							style: "default"
						}))}
					class={cn(
						$config.style === "default" && "border-2 border-primary"
					)}
				>
					Default
				</Button>
				<Button
					variant="outline"
					size="sm"
					on:click={() =>
						config.update((prev) => ({
							...prev,
							style: "new-york"
						}))}
					class={cn(
						$config.style === "new-york" &&
							"border-2 border-primary"
					)}
				>
					New York
				</Button>
			</div>
		</div>
		<div class="space-y-1 5">
			<Label class="text-xs">Color</Label>
			<div class="grid grid-cols-3 gap-2">
				{#each themes as theme (theme.name)}
					{@const isActive = $config.theme === theme.name}
					<Button
						variant="outline"
						size="sm"
						on:click={() => {
							config.update((prev) => ({
								...prev,
								theme: theme.name
							}));
						}}
						class={cn(
							"justify-start",
							isActive && "border-2 border-primary"
						)}
						style="--theme-primary: hsl({theme?.activeColor[
							$modeCurrent ? 'light' : 'dark'
						]}"
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
					{@const valueFloat = parseFloat(value)}
					<Button
						variant="outline"
						size="sm"
						on:click={() => {
							config.update((prev) => ({
								...prev,
								radius: valueFloat
							}));
						}}
						class={cn(
							$config.radius === valueFloat &&
								"border-2 border-primary"
						)}
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
					on:click={() => setModeCurrent(true)}
					class={cn($modeCurrent && "border-2 border-primary")}
				>
					<Sun class="mr-1 -translate-x-1" />
					Light
				</Button>
				<Button
					variant="outline"
					size="sm"
					on:click={() => setModeCurrent(false)}
					class={cn(!$modeCurrent && "border-2 border-primary")}
				>
					<Moon class="mr-1 -translate-x-1" />
					Dark
				</Button>
			</div>
		</div>
	</div>
</ThemeWrapper>
