<template>
  <v-card variant="outlined">
    <v-row class="d-flex align-center justify-center">
      <v-col class="text-center">
        <v-img
          :src="pokemon?.img"
          :alt="pokemon?.name"
          aspect-ratio="1"
          class="mx-auto"
          contain
          max-height="150px"
          max-width="150px"
        />
      </v-col>
    </v-row>
    <v-divider />
    <v-card-text class="d-flex justify-space-between align-center py-1">
      <div>{{ pokemon?.name.toUpperCase() }}</div>
      <v-btn
        class="smol"
        icon="mdi-delete"
        color="red"
        @click="() => removePokemon(pokemon)"
      />
    </v-card-text>
  </v-card>
  <div></div>
</template>

<script setup lang="ts">
  import { PokemonModel } from '~/utils/types'
  import { useContextStore } from '~/store'

  defineProps<{
    pokemon: PokemonModel
  }>()

  const { removePokemon } = useContextStore()
</script>

<style scoped>
  .smol {
    height: 32px;
    width: 32px;
  }
</style>
