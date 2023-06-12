<template>
  <v-card>
    <v-row>
      <v-col cols="4">
        <v-skeleton-loader type="image" width="100%" height="100%" />
      </v-col>
      <v-col cols="8">
        <v-card-title class="headline">
          <v-skeleton-loader type="text" width="50%" />
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader type="text" width="80%" />
          <v-skeleton-loader type="text" width="70%" />
          <v-skeleton-loader type="text" width="60%" />
          <v-skeleton-loader type="text" width="50%" />
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
  import { VSkeletonLoader } from 'vuetify/lib/labs/components.mjs'
</script>
