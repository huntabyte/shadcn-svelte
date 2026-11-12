<script lang="ts">
	import * as Picker from "$lib/components/picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { STYLES } from "$lib/registry/config.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { CreatePicker } from "./picker-state.svelte.js";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const previewOverride = usePreviewOverride();

	const currentStyle = $derived(
		STYLES.find((style) => style.name === designSystem.style) ?? STYLES[0]
	);

	const isMobile = new IsMobile();

	const picker = new CreatePicker(() => previewOverride.clearOverride());
</script>

<div class="group/picker relative">
	<Picker.Root bind:open={picker.open} {submenu}>
		<Picker.Trigger
			onpointerdown={picker.capture}
			onkeydown={(event) => {
				if (event.key === "Enter" || event.key === " ") picker.capture();
			}}
			{submenu}
		>
			<div class="flex flex-col justify-start text-left">
				<div class="text-xs text-muted-foreground">Style</div>
				<div class="text-sm font-medium text-foreground">
					{currentStyle?.title}
				</div>
			</div>
			<div
				class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center select-none md:right-2.5"
			>
				<currentStyle.icon class="size-4" />
			</div>
		</Picker.Trigger>
		<Picker.Content
			onmouseleave={() => previewOverride.clearOverride()}
			preventScroll={false}
			customAnchor={isMobile.current ? picker.layout?.anchor : undefined}
			class="max-md:w-[calc(var(--bits-dropdown-menu-anchor-width)-2px)]"
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem.style}>
				<Picker.Group>
					{#each STYLES as style (style.name)}
						<Picker.RadioItem
							onItemPreview={isMobile.current
								? undefined
								: (value) =>
										previewOverride.setOverride({
											style: value as typeof designSystem.style,
										})}
							value={style.name}
							closeOnSelect={false}
						>
							<div class="flex items-start gap-2">
								<div class="flex flex-col justify-start pointer-coarse:gap-1">
									<div>{style.title}</div>
								</div>
							</div>
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="style" class="absolute top-1/2 right-8 -translate-y-1/2" />
</div>
