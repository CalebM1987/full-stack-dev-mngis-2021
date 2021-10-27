<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { selectedFeature, layoutMode } from '@/modules/state'
import SidebarMenu from './SidebarMenu.vue'

export default defineComponent({
  name: 'sidebar',

  components: {
    SidebarMenu,
    BreweryInfo: defineAsyncComponent(() => import('./BreweryInfo.vue'))
  },

  setup() {
    return {
      layoutMode,
      selectedFeature
    }
    
  },
})
</script>

<template>
  <div class="drawer-content">
    <brewery-info v-if="selectedFeature && layoutMode === 'feature'" />
    <sidebar-menu v-else></sidebar-menu>
  </div>
  
</template>
