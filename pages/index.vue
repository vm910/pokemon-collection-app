<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    :timeout="2000"
    multi-line
    @input="() => (snackbar = false)"
    class="justify-center"
  >
    <v-icon :icon="snackbarIcon" />
    {{ snackbarText }}
  </v-snackbar>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <PokemonSkeletonCard v-if="loading || !pokemon" />
        <PokemonSearchCard
          v-else
          :pokemon="pokemon"
          @refresh-search="searchAgain"
          @pokemon-added="pokemonAddedNotification"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { PokemonResponse } from '~/utils/types'
  import { useContextStore } from '~/store'
  import { storeToRefs } from 'pinia'

  const { pokemon } = storeToRefs(useContextStore())
  const loading = ref(false)

  const snackbar = ref(false)
  const snackbarText = ref('')
  const snackbarColor = ref('success')

  const fetchRandomPokemon = async () => {
    loading.value = true
    const randomId = ref(Math.floor(Math.random() * 1000) + 1)
    const url = computed(
      () => `https://pokeapi.co/api/v2/pokemon/${randomId.value}`
    )

    const { data, error } = await useFetch<PokemonResponse>(url)

    if (error.value) {
      snackbarText.value = `Error fetching pokemon: ${error.value.message}`
      snackbar.value = true
      snackbarColor.value = 'error'
    }

    if (data.value) {
      const stats = data.value.stats || []
      const abilities = data.value.abilities || []

      pokemon.value = {
        name: data.value.name || 'Unknown',
        stats: {
          hp: stats[0]?.base_stat || 0,
          attack: stats[1]?.base_stat || 0,
          defense: stats[2]?.base_stat || 0,
          speed: stats[5]?.base_stat || 0,
        },
        mainAbility: abilities[0]?.ability.name || 'Unknown',
        img: data.value.sprites.front_default || '',
      }
    }
    loading.value = false
  }

  onMounted(() => {
    if (!pokemon.value) {
      fetchRandomPokemon()
    }
  })

  const searchAgain = () => {
    pokemon.value = null
    fetchRandomPokemon()
  }

  const pokemonAddedNotification = (pokemonName: string, success: boolean) => {
    if (!pokemonName) {
      snackbarText.value = 'Error adding pokemon to your collection!'
      snackbar.value = true
      snackbarColor.value = 'error'
      searchAgain()
    } else if (!success) {
      snackbarText.value = `${pokemonName.toUpperCase()} already in your collection!`
      snackbar.value = true
      snackbarColor.value = 'error'
      searchAgain()
    } else {
      snackbarText.value = `${pokemonName.toUpperCase()} added to your collection!`
      snackbar.value = true
      snackbarColor.value = 'success'
      searchAgain()
    }
  }

  const snackbarIcon = computed(() =>
    snackbarColor.value === 'success' ? 'mdi-check' : 'mdi-alert'
  )
</script>
