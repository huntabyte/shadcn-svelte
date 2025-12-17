<script lang="ts">
	import { RADII } from "$lib/registry/config.js";
	import * as Picker from "./picker/index.js";
	import { useCreateSearchParams } from "../lib/search-params.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";

	const params = useCreateSearchParams();

	const currentRadius = $derived(RADII.find((radius) => radius.name === params.radius) ?? RADII[0]);

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
				class="text-foreground pointer-events-none absolute right-4 top-1/2 flex size-4 -translate-y-1/2 rotate-90 select-none items-center justify-center text-base"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="text-foreground"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 20v-5C4 8.925 8.925 4 15 4h5"
					/>
				</svg>
			</div>
		</Picker.Trigger>
		<Picker.Content side={isMobile ? "top" : "right"} align={isMobile ? "center" : "start"}>
			<Picker.RadioGroup bind:value={params.radius}>
				<Picker.Group>
					{#each RADII as radius (radius.name)}
						{#if radius.name === "default"}
							<Picker.RadioItem value={radius.name}>
								<div class="pointer-coarse:gap-1 flex flex-col justify-start">
									<div>{radius.label}</div>
									<div
										class="text-muted-foreground pointer-coarse:text-sm text-xs"
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
