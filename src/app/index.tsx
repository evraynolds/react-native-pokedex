import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router"

interface Pokemon {
  name: string;
  imageFront: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

const colorByTypes: Record<string, string> = {
    normal:   "#A8A878",
    fire:     "#F08030",
    water:    "#6890F0",
    electric: "#F8D030",
    grass:    "#78C850",
    ice:      "#98D8D8",
    fighting: "#C03028",
    poison:   "#A040A0",
    ground:   "#E0C068",
    flying:   "#A890F0",
    psychic:  "#F85888",
    bug:      "#A8B820",
    rock:     "#B8A038",
    ghost:    "#705898",
    dragon:   "#7038F8"
  };


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
          imageFront: details.sprites.front_default,
          imageBack: details.sprites.back_default,
          types: details.types,
        };
      }));
      // console.log(JSON.stringify(detailedPokemons[0], null, 2));
      setPokemons(detailedPokemons);
    }
    catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }

  
  return (
    <ScrollView>
      {pokemons.map(pokemon => {
        const typeName = pokemon.types[0].type.name;
        const backgroundColor = colorByTypes[typeName] ?? "gray";

        return (
          <Link href="/details" key={pokemon.name}>
            <View style={{ backgroundColor, margin: 20 }}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Text style={styles.type}>{typeName}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Image source={{ uri: pokemon.imageFront }} style={{ width: 150, height: 150 }} />
                <Image source={{ uri: pokemon.imageBack }} style={{ width: 150, height: 150 }} />
              </View>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: 'center'
  },
  type: {
    textAlign: 'center'
  }
});
