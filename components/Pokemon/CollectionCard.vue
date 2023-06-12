<template>
  <v-card variant="outlined" @click="pokemonDetails">
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
        @click.stop="deleteDialog = true"
      />
    </v-card-text>
    <v-dialog v-model="deleteDialog" max-width="350px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          {{ pokemon?.name.toUpperCase() }}?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" variant="flat" @click="deleteDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="red" variant="flat" @click="deleteConfirmed"
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="detailsDialog" max-width="500px">
      <v-card>
        <PokemonDetails ability :selectedPokemon="pokemon" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" variant="flat" @click="detailsDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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

  const { removePokemon } = useContextStore()

  const deleteDialog = ref(false)
  const detailsDialog = ref(false)

  const deleteConfirmed = () => {
    removePokemon(props.pokemon)
    deleteDialog.value = false
  }

  const pokemonDetails = () => {
    detailsDialog.value = true
  }
</script>

<style scoped>
  .smol {
    height: 32px;
    width: 32px;
  }
</style>
