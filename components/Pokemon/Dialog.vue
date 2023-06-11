<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <PokemonDetails ability :selectedPokemon="selectedPokemon" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" @click="dialog = false">Close</v-btn>
        <v-btn color="red darken-1" @click="removeAndClose">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { useContextStore } from '~/store'
  import { PokemonModel } from '~/utils/types'

  const props = defineProps({
    selectedPokemon: {
      type: Object as PropType<PokemonModel | null>,
      required: true,
    },
  })
  const { removePokemon } = useContextStore()

  const dialog = ref(false)

  const removeAndClose = () => {
    removePokemon(props.selectedPokemon)
    dialog.value = false
  }

  watchEffect(() => {
    dialog.value = !!props.selectedPokemon
  })
</script>
