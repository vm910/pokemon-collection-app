import { defineStore } from 'pinia'
import { PokemonModel } from '@/utils/types'
import { ref, computed } from 'vue'

export const useContextStore = defineStore('context', () => {
  const selectedPokemon = ref<PokemonModel | null>(null)
  const pokemonList = ref<PokemonModel[]>([])

  const keepPokemon = (p: PokemonModel) => {
    if (!pokemonList.value.find((pokemon) => pokemon.name === p.name)) {
      pokemonList.value.push(p)
      return true
    } else {
      return false
    }
  }

  const removePokemon = (p: PokemonModel) => {
    pokemonList.value = pokemonList.value.filter(
      (pokemon) => pokemon.name !== p.name
    )
  }

  const selectPokemon = (p: PokemonModel) => {
    selectedPokemon.value = p
    console.log(selectedPokemon.value)
  }

  return {
    selectedPokemon,
    pokemonList,
    keepPokemon,
    removePokemon,
    selectPokemon,
  }
})
