<script lang="ts">
import { ref } from 'vue'
import Home from './views/Home'
import Sidebar from '@/components/Sidebar'
import { leftDrawerOpen } from '@/modules/state'

export default {
  name: 'LayoutDefault',

  components: {
    Home,
    Sidebar
  },

  setup () {
    return {
      leftDrawerOpen
    }
  }
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Brewery Finder
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <sidebar />
    </q-drawer>

    <q-page-container>
      <Home />
    </q-page-container>
  </q-layout>
</template>

