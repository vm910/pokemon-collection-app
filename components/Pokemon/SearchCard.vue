<template>
  <v-card variant="outlined">
    <v-row>
      <v-col cols="4" class="d-flex align-center justify-center">
        <v-img :src="pokemon?.img" :alt="pokemon?.name" />
        <v-divider vertical class="my-4" />
      </v-col>
      <v-col cols="8">
        <v-card-title class="headline my-2">
          {{ pokemon?.name.toUpperCase() }}
        </v-card-title>
        <v-card-text>
          <div v-for="(val, prop) in pokemon?.stats" :key="pokemon?.name">
            <v-icon :color="colorMap[prop]" :icon="statIconMap[prop]" />
            {{ prop.toUpperCase() }}: {{ val }}
          </div>
        </v-card-text>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" @click="addPokemon"> Keep pokemon </v-btn>
      <v-btn color="secondary" @click="$emit('refresh-search')">
        Look for a new one
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import { PokemonModel } from '~/utils/types'
  import { useContextStore } from '~/store'

  const props = defineProps<{
    pokemon: PokemonModel
  }>()

  const statIconMap = {
    hp: 'mdi-heart',
    attack: 'mdi-sword',
    defense: 'mdi-shield',
    speed: 'mdi-fast-forward',
  }

  const colorMap = {
    hp: 'red',
    attack: 'orange',
    defense: 'green',
    speed: 'blue',
  }

  const { keepPokemon } = useContextStore()

  const emit = defineEmits(['refresh-search', 'pokemon-added'])

  const addPokemon = () => {
    const success = keepPokemon(props.pokemon)
    emit('pokemon-added', props.pokemon.name, success)
  }
</script>

<style scoped></style>
