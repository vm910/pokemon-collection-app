<template>
  <v-card variant="outlined">
    <PokemonDetails ability :selected-pokemon="pokemon" />
    <v-divider />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="tonal" color="primary" @click="addPokemon"> Keep </v-btn>
      <v-btn variant="tonal" color="secondary" @click="$emit('refresh-search')">
        Search
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { PokemonModel } from '~/utils/types'
  import { useContextStore } from '~/store'

  const props = defineProps({
    pokemon: {
      type: Object as PropType<PokemonModel | null>,
      required: true,
    },
  })

  const { keepPokemon } = useContextStore()

  const emit = defineEmits(['refresh-search', 'pokemon-added'])

  const addPokemon = () => {
    if (!props.pokemon) return
    const success = keepPokemon(props.pokemon)
    emit('pokemon-added', props.pokemon.name, success)
  }
</script>

<style scoped></style>
