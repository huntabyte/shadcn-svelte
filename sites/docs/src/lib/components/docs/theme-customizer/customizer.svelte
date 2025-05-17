<script lang="ts">
	import { mode } from "mode-watcher";
	import { ConfigContext } from "$lib/config-state.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { cn } from "$lib/utils.js";
	import { IsMounted } from "runed";
	import { baseColors } from "$lib/registry/registry-base-colors.js";
	import CopyCodeButton from "./copy-code-button.svelte";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";

	const config = ConfigContext.get();
	const isMounted = new IsMounted();
</script>

<ThemeWrapper defaultTheme="zinc">
	<div
		class="grid w-full flex-1 grid-cols-2 flex-wrap items-start gap-2 sm:flex sm:items-center md:gap-6"
	>
		<div class="flex flex-col gap-2">
			<Label class="sr-only text-xs">Color</Label>
			<div class="flex flex-wrap gap-1 md:gap-2">
				{#each baseColors.filter((theme) => !["slate", "stone", "gray", "neutral"].includes(theme.name)) as theme (theme.name)}
					{@const isActive = config.current.theme === theme.name}
					{#if isMounted.current}
						<Button
							variant="outline"
							size="sm"
							onclick={() => {
								config.current.theme = theme.name;
							}}
							class={cn(
								"w-[32px] rounded-lg lg:px-2.5 xl:w-[86px]",
								isActive && "border-primary/50 ring-primary/30 ring-[2px]"
							)}
							style="--theme-primary: hsl({theme?.activeColor[
								mode.current === 'dark' ? 'dark' : 'light'
							]})"
						>
							<span
								class={cn(
									"bg-(--theme-primary) flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
								)}
							>
								{#if isActive}
									<CheckIcon class="!size-2.5 text-white" />
								{/if}
							</span>
							<span class="hidden xl:block">
								{theme.label === "Zinc" ? "Default" : theme.label}
							</span>
						</Button>
					{:else}
						<Skeleton class="h-8 w-[32px] xl:w-[86px]" />
					{/if}
				{/each}
			</div>
		</div>
		<Separator orientation="vertical" class="hidden h-6 sm:block" />
		<div class="flex flex-col gap-2">
			<Label class="sr-only text-xs">Radius</Label>
			<div class="flex flex-wrap gap-1 md:gap-2">
				{#each ["0", "0.3", "0.5", "0.75", "1.0"] as value (value)}
					<Button
						variant="outline"
						size="sm"
						onclick={() => {
							config.current.radius = parseFloat(value);
						}}
						class={cn(
							"w-[40px] rounded-lg",
							config.current.radius === parseFloat(value) &&
								"border-primary/50 ring-primary/30 ring-[2px]"
						)}
					>
						{value}
					</Button>
				{/each}
			</div>
		</div>
		<div class="flex gap-2 sm:ml-auto">
			<CopyCodeButton />
		</div>
	</div>
</ThemeWrapper>
