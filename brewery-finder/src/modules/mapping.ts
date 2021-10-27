import { Map, PointLike, GeoJSONSource, Point } from 'mapbox-gl'
import { findBreweries } from '@/services/api'

export async function initMap(map: Map){
  const fc = await findBreweries()

  map.loadImage('./img/beer.png', (err, img) => {
    if (err) throw err;
    // load icon and add to map style
    map.addImage('beer', img)

    // load geojson source
    map.addSource('breweries', {
      type: 'geojson',
      data: fc
    })
  
    // add layer and reference source
    map.addLayer({
      id: 'breweries-layer', 
      source: 'breweries',
      type: 'symbol',
      layout: {
        'icon-image': 'beer',
        // 'icon-size': 
      }
    })

  })

}