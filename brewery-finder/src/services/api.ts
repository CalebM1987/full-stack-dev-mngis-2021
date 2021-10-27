import { BBox, FeatureCollection, Point, Properties } from '@turf/turf'
import { IBrewery, IBeer, BreweryFeature, BreweryCollection, IQueryOptions } from '@/types/service'
import axios from 'axios';


export const instance = axios.create({
  baseURL: window.location.href.includes('/brewery')
    ? window.location.href.split('/brewery')[0]
    : 'http://localhost:5000'
})

export async function findBreweries(params?: IQueryOptions & IBrewery): Promise<BreweryCollection> {
  const { data } = await instance.get('/brewery/breweries/geojson', { params })
  return data as BreweryCollection
}

export async function findBeers(params?: IQueryOptions & IBeer): Promise<IBeer[]> {
  const { data } = await instance.get('/brewery/beers', { params })
  return data as IBeer[]
}
