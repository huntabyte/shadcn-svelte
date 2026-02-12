<script lang="ts">
	import ThemeCustomizer from "$lib/components/theme-customizer.svelte";
	import CardsDemo from "$lib/components/cards/cards-demo.svelte";
</script>

<div id="themes" class="container-wrapper scroll-mt-20">
	<div class="container flex items-center justify-between gap-8 px-6 py-4 md:px-8">
		<ThemeCustomizer />
	</div>
</div>
<div class="container-wrapper section-soft flex flex-1 flex-col pb-6">
	<div class="theme-container container flex flex-1 flex-col">
		<CardsDemo />
	</div>
</div>
