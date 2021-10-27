import { ref, Ref, computed } from 'vue'
import { MapboxGeoJSONFeature } from 'mapbox-gl'

export const selection: Ref<MapboxGeoJSONFeature[]> = ref([])
export const selectionIndex = ref(0)
export const leftDrawerOpen = ref(true)

export const selectedFeature = computed(
  ()=> selection.value.length 
    ? selection.value[selectionIndex.value]
    : null
)