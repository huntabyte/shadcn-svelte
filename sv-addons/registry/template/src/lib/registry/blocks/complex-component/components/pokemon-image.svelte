<script lang="ts">
	import { usePokemonImage } from "$lib/registry/blocks/complex-component/hooks/use-pokemon.svelte";

	let { number, name }: { number: number; name: string } = $props();

	const imageUrl = usePokemonImage(number);
</script>

{#if imageUrl}
	<img src={imageUrl} alt={name} />
{/if}
