<template>
  <v-container>
    <v-row>
      <v-col
        v-for="pokemon in pokemonList"
        :key="pokemon.name"
        cols="8"
        sm="6"
        md="4"
        lg="2"
      >
        <PokemonCollectionCard
          :pokemon="pokemon"
          @pokemon-selected="showPokemonDetails"
        />
      </v-col>
    </v-row>
    <PokemonDialog v-if="selectedPokemon" :selectedPokemon="selectedPokemon" />
  </v-container>
</template>

<script setup lang="ts">
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'
  import { PokemonModel } from '~/utils/types'

  const { pokemonList } = storeToRefs(useContextStore())

  const selectedPokemon = ref<PokemonModel | null>(null)

  const showPokemonDetails = (pokemon: PokemonModel) => {
    selectedPokemon.value = null

    nextTick(() => {
      selectedPokemon.value = pokemon
    })
  }
</script>
