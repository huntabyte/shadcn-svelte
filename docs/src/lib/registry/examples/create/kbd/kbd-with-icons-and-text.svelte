<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons and Text">
	<Kbd.Group>
		<Kbd.Root>
			<IconPlaceholder
				lucide="ArrowLeftIcon"
				tabler="IconArrowLeft"
				hugeicons="ArrowLeft01Icon"
				phosphor="ArrowLeftIcon"
				remixicon="RiArrowLeftLine"
			/>
			Left
		</Kbd.Root>
		<Kbd.Root>
			<IconPlaceholder
				lucide="CircleDashedIcon"
				tabler="IconCircleDashed"
				hugeicons="DashedLineCircleIcon"
				phosphor="CircleDashedIcon"
				remixicon="RiLoaderLine"
			/>
			Voice Enabled
		</Kbd.Root>
	</Kbd.Group>
</Example>
