<script lang="ts">
import { defineComponent } from 'vue';
import MapView from './MapView.vue'

export default defineComponent({
  name: 'Home',
  components: {
    MapView
  },
});
</script>

<template>
  <div class="home">
    <map-view></map-view>
  </div>
</template>

