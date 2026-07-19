<script lang="ts">
	import { RADII, type RadiusValue } from "$lib/registry/config.js";
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const previewOverride = usePreviewOverride();

	const isRadiusLocked = $derived(designSystem.style === "lyra" || designSystem.style === "sera");

	const isLargeRadiusDisabled = $derived(designSystem.style === "rhea");

	const selectedRadiusName = $derived(isRadiusLocked ? "none" : designSystem.radius);

	const currentRadius = $derived(
		RADII.find((radius) => radius.name === selectedRadiusName) ?? RADII[0]
	);

	const isMobile = new IsMobile();
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu} disabled={isRadiusLocked}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Radius</div>
				<div class="text-foreground text-sm font-medium">
					{currentRadius?.label}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
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
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup
				bind:value={
					() => selectedRadiusName,
					(value) => {
						if (isRadiusLocked) return;
						designSystem.radius = value as RadiusValue;
					}
				}
				onItemPreview={isMobile.current || isRadiusLocked
					? undefined
					: (value) =>
							previewOverride.setOverride({
								radius: value as typeof designSystem.radius,
							})}
			>
				<Picker.Group>
					{#each RADII as radius (radius.name)}
						{#if radius.name === "default"}
							<Picker.RadioItem value={radius.name} closeOnSelect={false}>
								{radius.label}</Picker.RadioItem
							>
							<Picker.Separator />
						{:else}
							<Picker.RadioItem
								value={radius.name}
								closeOnSelect={false}
								disabled={isLargeRadiusDisabled && radius.name === "large"}
							>
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
