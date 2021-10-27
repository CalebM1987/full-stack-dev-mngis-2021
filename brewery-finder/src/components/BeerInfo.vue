<script lang="ts">
import { defineComponent, computed, PropType, toRefs, Ref } from 'vue'
import { getBeerImgUrl, baseURL } from '@/services/api'
import { IBeer } from '@/types/service'

export default defineComponent({
  props: {
    beer: {
      type: Object as PropType<IBeer>,
      required: true
    }
  },
  setup(props) {
    const { beer } = toRefs(props) 
    // having weird typescript issues in my vs code :(
    const imgUrl = computed(()=> getBeerImgUrl((beer as Ref<IBeer>).value))
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
