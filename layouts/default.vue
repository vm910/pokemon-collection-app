<template>
  <v-app>
    <client-only>
      <v-app-bar :elevation="1" density="compact">
        <v-app-bar-nav-icon
          v-show="mobile"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Pokemon collection </v-toolbar-title>
        <v-toolbar-items>
          <v-switch
            class="mr-4"
            :prepend-icon="icon"
            @change="toggleTheme"
          ></v-switch
        ></v-toolbar-items>
      </v-app-bar>
      <v-navigation-drawer
        :model-value="showDrawer"
        @update:model-value="drawer = !drawer"
      >
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-pokeball"
            title="Search"
            to="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-list-box"
            title="My Pokemons"
            to="/pokemons"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </client-only>
  </v-app>
</template>
<script setup lang="ts">
  import { useDisplay } from 'vuetify/lib/framework.mjs'
  import { ref, computed } from 'vue'
  import { useTheme } from 'vuetify/lib/framework.mjs'

  const { mobile } = useDisplay()
  const drawer = ref(false)
  const theme = useTheme()

  const showDrawer = computed(() => {
    return !mobile.value || drawer.value
  })

  const toggleTheme = () =>
    (theme.global.name.value = theme.global.current.value.dark
      ? 'light'
      : 'dark')

  const icon = computed(() =>
    theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'
  )
</script>
