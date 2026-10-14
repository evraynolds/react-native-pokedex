
export interface Pokemon {
    name: string;
    imageFront: string;
    imageBack: string;
    types: PokemonType[];
  }
  
export interface PokemonType {
    type: {
      name: string;
      url: string;
    }
  }
  