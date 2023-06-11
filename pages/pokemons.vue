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
        <PokemonCollectionCard :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const { pokemonList } = storeToRefs(useContextStore())
</script>
