<script lang="ts">
import { defineComponent, ref, Ref, onMounted, defineAsyncComponent } from "vue";
import { mapSetup } from '@/composables/mapView'
import { 
  MapboxMap, 
  MapboxGeolocateControl,
  MapboxGeocoderControl, 
} from "vue-mapbox-ts";

export default defineComponent({
  components: {
    MapboxMap,
    MapboxGeolocateControl,
    MapboxGeocoderControl,
  },

  setup() {

    const {
      vmb_map,
      selection,
      selectionIndex,
      selectedFeature,
      clickPoint,
      onMapLoad,
      accessToken
    } = mapSetup()

    return {
      vmb_map,
      selection,
      selectionIndex,
      selectedFeature,
      clickPoint,
      onMapLoad,
      accessToken
    }
    
  },

  mounted(){
    console.log('mounted map view: ', this)
  }
});
</script>

<template>

  <div class="map-wrapper fill">
    <mapbox-map 
      ref="mapbox"
      mapStyle="streets-v11"
      :zoom="13"
      :accessToken="accessToken"
      :center="[-93.1218293380, 45.03720332734]"
      :auto-resize="true"
      @loaded="onMapLoad"
    >

      <mapbox-geocoder-control position="top-right">
        <!-- <template v-slot:input="{result, results}">
          <input>
          <div>{{ result ? result.place_name : 'no result' }}</div>
          <div>{{ results.features ? results.features.map(f => f.place_name) : 'no results' }}</div>
        </template> -->
      </mapbox-geocoder-control>
    
      <mapbox-geolocate-control />

      <mapbox-draw-control 
        ref="drawControls"
        position="top-left"
        :controls="{ polygon: true, trash: true }"
        @create="addPolygon"
        @update="isDrawing=true"
      >button</mapbox-draw-control>

      <mapbox-popup
        v-if="showPopup"
        :lngLat="[clickPoint.lng, clickPoint.lat]"
      >
        <popup-content
          :feature="selectedFeature"
          @close="showPopup = false"
        ></popup-content>
      </mapbox-popup>

    </mapbox-map>


  </div>

</template>

<style lang="scss">

  .map-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0
    bottom: 0;
  }

</style>
