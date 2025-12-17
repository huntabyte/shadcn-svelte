<script lang="ts">
	import { RADII } from "$lib/registry/config.js";
	import * as Picker from "./picker/index.js";
	import { useCreateSearchParams } from "../lib/search-params.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";

	const params = useCreateSearchParams();

	const currentRadius = $derived(
		RADII.find((radius) => radius.name === params.radius) ?? RADII[0]
	);

	const isMobile = new IsMobile();
</script>

<div class="group/picker relative">
	<Picker.Root>
		<Picker.Trigger>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Radius</div>
				<div class="text-foreground text-sm font-medium">
					{currentRadius?.label}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
			>
				<div
					class="size-4 border-t-2 border-r-2 border-current transition-all"
					style="border-top-right-radius: {currentRadius?.value};"
				></div>
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
		>
			<Picker.RadioGroup bind:value={params.radius}>
				<Picker.Group>
					{#each RADII as radius (radius.name)}
						{#if radius.name === "default"}
							<Picker.RadioItem value={radius.name}>
								<div class="flex flex-col justify-start pointer-coarse:gap-1">
									<div>{radius.label}</div>
									<div
										class="text-muted-foreground text-xs pointer-coarse:text-sm"
									>
										Use radius from style
									</div>
								</div>
							</Picker.RadioItem>
							<Picker.Separator />
						{:else}
							<Picker.RadioItem value={radius.name}>
								{radius.label}
							</Picker.RadioItem>
						{/if}
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="radius" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
