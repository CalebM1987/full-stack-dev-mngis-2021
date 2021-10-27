<script lang="ts">
import { defineComponent } from 'vue'
import { selectedFeature, layoutMode } from '@/modules/state'

export default defineComponent({
  setup() {
    return {
      selectedFeature,
      layoutMode
    }
  },
})
</script>

<template>
  <q-list>
    <q-item-label header>Menu</q-item-label>
    <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
      <q-item-section avatar>
        <q-icon name="search" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Search</q-item-label>
        <q-item-label caption>search for breweries</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
      <q-item-section avatar>
        <q-icon name="liquor" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Beers</q-item-label>
        <q-item-label caption>find beers</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable tag="a" @click="layoutMode = 'feature'" v-if="selectedFeature">
      <q-item-section avatar>
        <q-icon name="place" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Brewery Info</q-item-label>
        <q-item-label caption>see brewery information</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
