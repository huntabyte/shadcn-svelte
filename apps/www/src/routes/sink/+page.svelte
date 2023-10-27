<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs";
	import ComboboxDemo from "@/registry/default/example/combobox-demo.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<ComboboxDemo />
	</ComponentPreviewManual>
{/if}
