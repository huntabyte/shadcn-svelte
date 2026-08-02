<script lang="ts">
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { MENU_ACCENTS, type MenuAccentValue } from "$lib/registry/config.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import * as Picker from "./picker/index.js";
	import LockButton from "./lock-button.svelte";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const previewOverride = usePreviewOverride();
	const isMobile = new IsMobile();

	const currentAccent = $derived(
		MENU_ACCENTS.find((accent) => accent.value === designSystem.menuAccent) ?? MENU_ACCENTS[0]
	);
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-xs text-muted-foreground">Menu Accent</div>
				<div class="text-sm font-medium text-foreground">
					{currentAccent.label}
				</div>
			</div>
			<div
				class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="128"
					height="128"
					viewBox="0 0 24 24"
					fill="none"
					class="size-4 text-foreground"
				>
					<path
						d="M19 12.1294L12.9388 18.207C11.1557 19.9949 10.2641 20.8889 9.16993 20.9877C8.98904 21.0041 8.80705 21.0041 8.62616 20.9877C7.53195 20.8889 6.64039 19.9949 4.85726 18.207L2.83687 16.1811C1.72104 15.0622 1.72104 13.2482 2.83687 12.1294M19 12.1294L10.9184 4.02587M19 12.1294H2.83687M10.9184 4.02587L2.83687 12.1294M10.9184 4.02587L8.89805 2"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						data-accent={currentAccent.value}
						class="fill-muted-foreground/30 data-[accent=bold]:fill-foreground"
					></path>
					<path
						d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 20 17 20 17C20 17 22 18.8954 22 20Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						data-accent={currentAccent.value}
						class="fill-muted-foreground/30 data-[accent=bold]:fill-foreground"
					></path>
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
				value={currentAccent.value}
				onValueChange={(value) => {
					designSystem.menuAccent = value as MenuAccentValue;
				}}
				onItemPreview={isMobile.current
					? undefined
					: (value) => previewOverride.setOverride({ menuAccent: value as MenuAccentValue })}
			>
				<Picker.Group>
					{#each MENU_ACCENTS as accent (accent.value)}
						<Picker.RadioItem value={accent.value} closeOnSelect={false}>
							{accent.label}
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="menuAccent" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
