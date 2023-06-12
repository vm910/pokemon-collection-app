<template>
  <v-row no-gutters>
    <v-col cols="4" class="d-flex">
      <v-img :src="selectedPokemon?.img" :alt="selectedPokemon?.name" />
      <v-divider vertical class="my-4" />
    </v-col>
    <v-col cols="8">
      <v-card-title>
        {{ selectedPokemon?.name.toUpperCase() }}
      </v-card-title>
      <v-card-text>
        <div
          v-for="(val, prop) in selectedPokemon?.stats"
          :key="selectedPokemon?.name"
        >
          <v-icon :color="colorMap[prop]" :icon="statIconMap[prop]" />
          {{ prop.toUpperCase() }}: {{ val }}
        </div>
        <div class="ability" v-if="ability">
          <v-divider />
          <div class="ability">Ability: {{ selectedPokemon?.mainAbility }}</div>
        </div>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { PokemonModel } from '~/utils/types'

  defineProps({
    selectedPokemon: {
      type: Object as PropType<PokemonModel | null>,
      required: true,
    },

    ability: {
      type: Boolean,
      default: false,
    },
  })

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
</script>

<style scoped>
  .ability {
    margin: 8px 0;
  }
</style>
