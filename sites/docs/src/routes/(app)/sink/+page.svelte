<script lang="ts">
	import { dev } from "$app/environment";
	import { ComponentPreviewManual } from "$lib/components/docs/index.js";
	import CarouselDemo from "$lib/registry/default/example/carousel-demo.svelte";
	import CarouselDemoNY from "$lib/registry/new-york/example/carousel-demo.svelte";
</script>

{#if dev}
	<ComponentPreviewManual>
		<CarouselDemo />
	</ComponentPreviewManual>
	<ComponentPreviewManual>
		<CarouselDemoNY />
	</ComponentPreviewManual>
{/if}
