import { useEffect, useState } from 'react'

import { fetchPokemonDetails } from '@/api'
import { type Pokemon } from '@/types'

export const usePokemon = () => {
    const [pokemons, setPokemon] = useState<Pokemon[]>([])

    useEffect(() => {
      const getPokemon = async () => {
        try{
          const detailedPokemon = await fetchPokemonDetails()
          setPokemon(detailedPokemon);
        }
        catch (error) {
          console.error("Error fetching pokemons:", error);
        }
      }
      getPokemon()
    })

    return { pokemons }
}