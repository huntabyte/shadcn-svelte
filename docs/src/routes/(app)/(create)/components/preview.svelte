<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import PreviewSwitcher from "./preview-switcher.svelte";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();

	const designSystem = useDesignSystem();
</script>

<div
	data-slot="preview"
	class="border-border relative -mx-1 flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border sm:mx-0"
>
	<div
		class={cn(
			"z-0 mx-auto flex max-h-(--preview-height) w-full flex-1 flex-col overflow-y-auto"
		)}
	>
		<Button
			href="/preview/{item}{new URL(designSystem.shareUrl).search}&fromPreview=true"
			class="absolute top-2 right-2 isolate z-10"
			variant="ghost"
			size="icon-sm"
		>
			<IconPlaceholder
				lucide="MaximizeIcon"
				tabler="IconBorderCorners"
				hugeicons="ArrowExpandIcon"
				phosphor="CornersOutIcon"
				remixicon="RiExpandDiagonalLine"
			/>
		</Button>
		<iframe src="/preview/{item}" class="h-(--preview-height)" title={item}></iframe>
		<PreviewSwitcher {item} />
	</div>
</div>
