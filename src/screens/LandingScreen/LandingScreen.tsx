import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

import { usePokemon } from '@/hooks';
import { colorByTypes } from '@/theme';
import styles from './LandingScreen.styles';

export const LandingScreen = () => {
    const {pokemons} = usePokemon();
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
    )
}

