export async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  return await response.json();
}


export async function fetchPokemonDetails() {
  const data = await fetchPokemon()
  return await Promise.all(data.results.map(async (pokemon: any) => {
    const response = await fetch(pokemon.url);
    const details = await response.json();
    return {
      name: pokemon.name,
      imageFront: details.sprites.front_default,
      imageBack: details.sprites.back_default,
      types: details.types,
    };
  }));
}