<script lang="ts">
	import * as Picker from "./picker/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { fonts, getFont } from "$lib/registry/config.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();

	const isMobile = new IsMobile();

	const currentFont = $derived(getFont(designSystem.font) ?? fonts[0]);
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Font</div>
				<div class="text-foreground text-sm font-medium">
					{currentFont?.title}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
				style="font-family: {currentFont?.font.family}"
			>
				Aa
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="max-h-80 md:w-72"
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem.font}>
				<Picker.Group>
					{#each fonts as font, index (font.name)}
						<Picker.RadioItem
							value={font.name.replace("font-", "")}
							closeOnSelect={false}
						>
							<Item.Root size="sm">
								<Item.Content class="gap-1">
									<Item.Title class="text-muted-foreground text-xs font-medium">
										{font.title}
									</Item.Title>
									<Item.Description
										class="text-foreground"
										style="font-family: {font.font.family}"
									>
										Designers love packing quirky glyphs into test phrases.
									</Item.Description>
								</Item.Content>
							</Item.Root>
						</Picker.RadioItem>
						{#if index < fonts.length - 1}
							<Picker.Separator class="opacity-50" />
						{/if}
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="font" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
