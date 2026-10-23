// Unnecessary hook, but an example of how to add a hook to a custom registry.

export function usePokemonImage(number: number) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}
