<script lang="ts">
import { defineComponent, computed, ref, Ref, onMounted, defineAsyncComponent, watchEffect } from 'vue'
import { selectedFeature } from '@/modules/state'
import { getDirectionsUrl } from '@/modules/utils'
import { findBeersFromBrewery } from '@/services/api'
import { IBeer } from '@/types/service'


export default defineComponent({
  components: {
    BeerInfo: defineAsyncComponent(()=> import('./BeerInfo.vue'))
  },

  setup() {

    const beers: Ref<IBeer[]> = ref([])
    const directionsUrl = computed(()=> getDirectionsUrl(selectedFeature.value))

    watchEffect(async ()=> {
      if (selectedFeature.value){
        console.log('brewery changed: ', selectedFeature.value)
        const resp = await findBeersFromBrewery(selectedFeature.value)
        beers.value = resp
      } else {
        beers.value = []
      }
      
    })

    return {
      beers,
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

    <div class="beers-container">
      <q-expansion-item
        v-if="beers.length"
        default-opened
        expand-separator
        label="Featured Beers"
      >
        <beer-info 
          v-for="beer in beers" 
          :key="beer.id" 
          :beer="beer"
        ></beer-info>

      </q-expansion-item>
      
    </div>

  </div>
</template>
