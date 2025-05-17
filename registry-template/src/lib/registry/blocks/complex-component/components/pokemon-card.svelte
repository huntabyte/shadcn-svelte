<script lang="ts">
	import { getPokemon } from "$lib/registry/blocks/complex-component/lib/pokemon.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import PokemonImage from "$lib/registry/blocks/complex-component/components/pokemon-image.svelte";

	let { name }: { name: string } = $props();
</script>

{#await getPokemon(name)}
	<div>Loading...</div>
{:then pokemon}
	{#if pokemon}
		<Card.Root>
			<Card.Content class="flex flex-col items-center p-2">
				<div>
					<PokemonImage name={pokemon.name} number={pokemon.id} />
				</div>
				<div class="text-center font-medium">{pokemon.name}</div>
			</Card.Content>
		</Card.Root>
	{/if}
{:catch}
	<div>Error loading pokemon</div>
{/await}
