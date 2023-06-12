<template>
  <v-card variant="outlined">
    <PokemonDetails ability :selected-pokemon="pokemon" />
  </v-card>
</template>

<script setup lang="ts">
  import { PokemonModel } from '~/utils/types'
  defineProps({
    pokemon: {
      type: Object as PropType<PokemonModel | null>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped></style>
