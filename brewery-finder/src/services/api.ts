import { BBox, FeatureCollection, Point, Properties } from '@turf/turf'
import { IBrewery, IBeer, BreweryFeature, BreweryCollection, IQueryOptions } from '@/types/service'
import axios from 'axios';

export const baseURL = window.location.href.includes('/brewery')
  ? window.location.href.split('/brewery')[0]
  : 'http://localhost:5000'

export const instance = axios.create({
  baseURL
})

export async function findBreweries(params?: IQueryOptions & IBrewery): Promise<BreweryCollection> {
  const { data } = await instance.get('/brewery/breweries/geojson', { params })
  return data as BreweryCollection
}

export async function findBeersFromBrewery(ft: BreweryFeature): Promise<IBeer[]> {
  const { data } = await instance.get(`/brewery/breweries/${ft.properties.id}/beers`)
  return data as IBeer[]
}

export function getBeerImgUrl(beer: IBeer): string | null {
  return beer.photo_name ? `${baseURL}/brewery/beers/${beer.id}/photo`: null
}

export async function findBeers(params?: IQueryOptions & IBeer): Promise<IBeer[]> {
  const { data } = await instance.get('/brewery/beers', { params })
  return data as IBeer[]
}
