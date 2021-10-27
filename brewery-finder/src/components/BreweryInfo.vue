<script lang="ts">
import { defineComponent, computed } from 'vue'
import { selectedFeature } from '@/modules/state'
import { getDirectionsUrl } from '@/modules/utils'

export default defineComponent({
  setup() {

    const directionsUrl = computed(()=> getDirectionsUrl(selectedFeature.value))

    return {
      directionsUrl,
      selectedFeature
    }
    
  },
})
</script>

<template>
  <div class="brewery-info-container q-pa-md q-gutter-md text-center">
    
    <div class="text-h5">{{ selectedFeature.properties.name }}</div>
    <hr>
    
    <div class="brewery-info">
      <p>{{ selectedFeature.properties.address }}</p>
      <p>{{ selectedFeature.properties.city }}, {{ selectedFeature.properties.state }} {{ selectedFeature.properties.zip }}</p>
      <div class="d-flex">
        <a :href="selectedFeature.properties.website" target="_blank" rel="noopener noreferrer">website</a>
        |
        <a :href="directionsUrl" target="_blank" rel="noopener noreferrer">directions</a>
      </div>
    </div>

  </div>
</template>
