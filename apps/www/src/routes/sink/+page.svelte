<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs";
	import CalendarDemo from "@/registry/default/example/calendar-demo.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<CalendarDemo />
	</ComponentPreviewManual>
{/if}
