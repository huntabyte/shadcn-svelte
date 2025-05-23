<script lang="ts">
	import PokemonCard from "./components/pokemon-card.svelte";
	import { getPokemonList } from "./lib/pokemon.js";
</script>

{#await getPokemonList({ limit: 12 })}
	<div>Loading pokemons...</div>
{:then pokemons}
	{#if pokemons}
		<div class="mx-auto w-full max-w-2xl px-4">
			<div class="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4">
				{#each pokemons.results as pokemon (pokemon.name)}
					<PokemonCard name={pokemon.name} />
				{/each}
			</div>
		</div>
	{/if}
{:catch}
	<div class="mx-auto w-full max-w-2xl px-4">
		<p>Error loading pokemons</p>
	</div>
{/await}
