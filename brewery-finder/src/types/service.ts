import { Feature, FeatureCollection, Point } from '@turf/turf';
import { MapboxGeoJSONFeature } from 'mapbox-gl'

export interface IBrewery {
  state?:     string;
  address:   string;
  id?:        number;
  saturday?:  string;
  sunday?:    string;
  website?:   string;
  latitude:  number;
  longitude: number;
  city?:      string;
  tuesday?:   string;
  thursday?:  string;
  brew_type?: string;
  monday?:    string;
  comments?:  string;
  wednesday?: string;
  friday?:    string;
  name:      string;
  zip?:       string;
}

export type BreweryFeature = Feature<Point, IBrewery> | MapboxGeoJSONFeature;

export type BreweryCollection = FeatureCollection<Point, IBrewery>;

export interface IQueryOptions {
  $order_by?: string;
  $limit?: number;
  [k: string]: string | number;
}

export interface IBeer {
  id?:          number;
  name:        string;
  ibu?:         number;
  category?:    string;
  brewery_id?:  number;
  color?:       string;
  alc?:         number;
  description: string;
  created_by?:  null;
  photo_name?:  null;
  style:       string;
}
