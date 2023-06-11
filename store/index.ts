import { defineStore } from 'pinia'
import { PokemonModel } from '@/utils/types'
import { ref } from 'vue'

export const useContextStore = defineStore('context', () => {
  const pokemon = ref<PokemonModel | null>(null)
  const pokemonList = ref<PokemonModel[]>([])

  const keepPokemon = (p: PokemonModel | null) => {
    if (p === null) return false
    if (!pokemonList.value.find((pokemon) => pokemon.name === p.name)) {
      pokemonList.value.push(p)
      return true
    } else {
      return false
    }
  }

  const removePokemon = (p: PokemonModel | null) => {
    if (p === null) return false
    pokemonList.value = pokemonList.value.filter(
      (pokemon) => pokemon.name !== p.name
    )
    return true
  }

  return {
    pokemon,
    pokemonList,
    keepPokemon,
    removePokemon,
  }
})
