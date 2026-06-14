<script lang="ts">
	import CtaMobile from "$lib/components/cta-mobile.svelte";
	import { cn } from "$lib/utils.js";
	import PreviewSwitcher from "./preview-switcher.svelte";

	type Props = {
		item: string;
	};

	let { item }: Props = $props();
</script>

<div data-slot="preview" class="flex min-h-0 flex-1 flex-col gap-(--gap)">
	<div class="hidden md:block">
		<CtaMobile class="xl:flex" />
	</div>
	<div
		class="border-border relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl border"
	>
		<div
			class={cn(
				"z-0 mx-auto flex max-h-(--preview-height) w-full flex-1 flex-col overflow-y-auto"
			)}
		>
			<!--<Button
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
		</Button>-->
			<iframe src="/preview/{item}" class="h-(--preview-height)" title={item}></iframe>
			<PreviewSwitcher {item} />
		</div>
	</div>
</div>
