<script lang="ts">
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import All from "$lib/registry/examples/cards/all.svelte";
</script>

<svelte:head>
	<style>
		@import "/themes.css";
	</style>
</svelte:head>

<ThemeWrapper>
	<All />
</ThemeWrapper>
