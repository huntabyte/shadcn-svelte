<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs";
	import CarouselDemo from "@/registry/default/example/carousel-demo.svelte";
	import CarouselDemoNY from "@/registry/new-york/example/carousel-demo.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<CarouselDemo />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<CarouselDemoNY />
	</ComponentPreviewManual>
{/if}
