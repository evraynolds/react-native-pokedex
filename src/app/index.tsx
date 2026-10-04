import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";


interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();

      // setPokemons(data.results)

      const detailedPokemons = await Promise.all(data.results.map(async (pokemon: any) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          types: details.types,
        };
      }));
      console.log(JSON.stringify(detailedPokemons[0], null, 2));
      setPokemons(detailedPokemons);
    }
    catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }
  return (
    <ScrollView>
      {pokemons.map(pokemon => (
        <View key={pokemon.name}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text>{pokemon.types[0].type.name}</Text>
          <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  }
});
