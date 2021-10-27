<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { getBeerImageUrl, baseURL } from '@/services/api'
import { IBeer } from '@/types/service'

export default defineComponent({
  props: {
    beer: {
      type: Object as PropType<IBeer>,
      required: true
    }
  },
  setup(props) {
    
    // const imgUrl = computed(()=> getBeerImageUrl(props.beer))
    const imgUrl = computed(() => props.beer.photo_name ? `${baseURL}/brewery/beers/${props.beer.id}/photo`: null)
    // const imgUrl = null
    console.log('props.beer? ', props.beer, imgUrl.value)
    return {
      imgUrl
    }
  },
})
</script>

<template>
  <div class="beer-info">
    <h6 class="mt-2"><strong>{{ beer.name }}</strong></h6>
    <q-img :src="imgUrl" v-if="imgUrl" class="q-pb-md"></q-img>
    <div class="featured-beer-body">
      <p style="text-align: center;">{{ beer.description }}</p>
      <span class="beer-info">
        <p>Style: {{ beer.style }}</p>
        <p>Alc: {{ beer.alc }}% by Vol</p>
        <p>IBU: {{ beer.ibu }}</p>
        <p>Color: {{ beer.color }}</p>
      </span>
    </div>

  </div>
</template>
