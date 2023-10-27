<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs";
	import ComboboxDemo from "@/registry/new-york/example/combobox-demo.svelte";
	import ComboboxPopover from "@/registry/new-york/example/combobox-popover.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<ComboboxPopover />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<ComboboxDemo />
	</ComponentPreviewManual>
{/if}
