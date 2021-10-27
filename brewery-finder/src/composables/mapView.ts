import { ref, Ref, computed, inject, onMounted, watchEffect } from 'vue';
import { Map, PointLike, MapboxGeoJSONFeature, LngLat } from 'mapbox-gl';
import { selection, selectionIndex, selectedFeature, layoutMode } from '@/modules/state'
import { initMap } from '@/modules/mapping'
import { EventBus } from '@/modules/event'
import Deferred from 'my-deferred';

export function mapSetup() {
  // const isDrawing = ref(false)
  
  const clickPoint: Ref<LngLat | null> = ref(null)
  const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
  
  function clickHandler(e: any) {
    const map = e.target as Map
    selectionIndex.value = -1
    console.log('click: ',e)
    clickPoint.value = e.lngLat
    const tolerance = 5
    const bbox = [
        [e.point.x - tolerance, e.point.y - tolerance],
        [e.point.x + tolerance, e.point.y + tolerance]
    ] as [PointLike, PointLike ];
  
    const feats = map.queryRenderedFeatures(bbox, {
      layers: ['breweries-layer']
    })
    console.log('feats?', feats)
    selection.value = feats
    selectionIndex.value = 0

    layoutMode.value = feats.length ? 'feature': 'menu'
  }

  const onMapLoad = (map: Map) => {
    initMap(map)
    // const drawControls = getDrawControls(map)
    // drawControls.set('controls',  {
    //   polygon: true,
    //   trash: true,
    //   point: false,
    //   line_string: false,
    //   combine_features: false,
    //   uncombine_features: false
    // })
    map.on('click', clickHandler)
    EventBus.on('zoom-to-feature', (ft: any) => {
      console.log('zoom to feature event: ',  ft)
      map.flyTo({ center: ft.geometry?.coordinates, zoom: 19, curve: 1, speed: 1.2 })
    })

    map.on('mouseenter', 'detections', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
      
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'detections', () => {
      map.getCanvas().style.cursor = '';
    });

    watchEffect(()=> {
      console.log('trigger map filter???')

      // if (map) {

      //   if (lyrFltrLen || valueFltrLen){
      //     // const layerFilter = ['match', ['get', 'layer'], mapModule.layerFilters, true, false]
      //     // const valueFilter =  ['match', ['get', 'value'], mapModule.featureFilters, true, false]
      //     const layerFilter = ['in', 'layer', ...mapModule.layerFilters]
      //     const valueFilter =  ['any',
      //       ['in','value', ...mapModule.featureFilters],
      //       ['==', 'layer', 'mly1_public']
      //     ]
      //     const filters: any[] = []
      //     lyrFltrLen && filters.push(layerFilter)
      //     valueFltrLen && filters.push(valueFilter)
      //     console.log('settinf filter???', 'detections', [ 'all', filters ], mapModule.featureFilters)
         
      //     map.setFilter('detections', [ 'all', ...filters ])
        
      //   } else {
      //     map.setFilter('detections', ['match', ['get', 'layer'], null, true, false])
      //   }
      // }
      
    })
  }

  onMounted(async ()=> {
    const map = await vmb_map?.promise
    console.log('deferred map?', map)

    //@ts-ignore
    window.state = {
      selectedFeature,
      selection,
      selectionIndex,
      layoutMode
    }

    
  })

  return {
    vmb_map,
    selectedFeature,
    selectionIndex,
    // isDrawing,
    selection,
    clickPoint,
    onMapLoad,
    //@ts-ignore (process is undefined???)
    accessToken: process.env.VUE_APP_MAPBOX_TOKEN
  }

}