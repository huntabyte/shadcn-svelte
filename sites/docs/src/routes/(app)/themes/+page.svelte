<script lang="ts">
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import CardsDemo from "$lib/components/docs/cards/demo.svelte";
</script>

<svelte:head>
	<style>
		@import "/themes.css";
	</style>
</svelte:head>

<ThemeWrapper>
	<CardsDemo />
</ThemeWrapper>
