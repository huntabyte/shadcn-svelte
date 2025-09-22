<script lang="ts">
	import ThemeCustomizer from "$lib/components/theme-customizer.svelte";
	import Demo from "$lib/components/cards/demo.svelte";
</script>

<div id="themes" class="container-wrapper scroll-mt-20">
	<div class="container flex items-center justify-between gap-8 px-6 py-4 md:px-8">
		<ThemeCustomizer />
	</div>
</div>
<div class="container-wrapper flex flex-1 flex-col section-soft pb-6">
	<div class="container flex flex-1 flex-col theme-container">
		<Demo />
	</div>
</div>
