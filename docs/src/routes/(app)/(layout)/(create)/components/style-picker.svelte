<script lang="ts">
	import { STYLES } from "$lib/registry/config.js";
	import LockButton from "./lock-button.svelte";
	import * as Picker from "./picker/index.js";
	import { useCreateSearchParams } from "../lib/search-params.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";

	const params = useCreateSearchParams();

	const currentStyle = $derived(STYLES.find((style) => style.name === params.style) ?? STYLES[0]);

	const isMobile = new IsMobile();
</script>

<div class="group/picker relative">
	<Picker.Root>
		<Picker.Trigger>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Style</div>
				<div class="text-foreground text-sm font-medium">
					{currentStyle?.title}
				</div>
			</div>
			<div
				class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center select-none"
			>
				<currentStyle.icon class="size-4" />
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="md:w-64"
		>
			<Picker.RadioGroup bind:value={params.style}>
				<Picker.Group>
					{#each STYLES as style, i (style.name)}
						<Picker.RadioItem value={style.name}>
							<div class="flex items-start gap-2">
								<div
									class="flex size-4 translate-y-0.5 items-center justify-center"
								>
									<style.icon class="size-4" />
								</div>
								<div class="flex flex-col justify-start pointer-coarse:gap-1">
									<div>{style.title}</div>
									<div
										class="text-muted-foreground text-xs pointer-coarse:text-sm"
									>
										{style.description}
									</div>
								</div>
							</div>
						</Picker.RadioItem>
						{#if i < STYLES.length - 1}
							<Picker.Separator />
						{/if}
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="style" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
