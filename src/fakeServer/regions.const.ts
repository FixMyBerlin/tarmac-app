import {
  MapDataThemeIds,
  SourcesRasterIds,
  themes,
} from '@components/MapInterface/mapData'
import { adminIds } from './utils'

type RegionMap = {
  lat: number
  lng: number
  zoom: number
}

export type Region = {
  name: string
  fullName: string
  path: RegionPath
  map: RegionMap
  bbox: { min: [number, number]; max: [number, number] } | null
  logoPath: string | null
  logoWhiteBackgroundRequired: boolean
  themes: MapDataThemeIds[]
  osmUsers: number[]
  /** @desc published=true regions are visible on production, all others are not */
  published: boolean
  backgroundSources: SourcesRasterIds[]
}

const defaultBackgroundSources: SourcesRasterIds[] = [
  'mapnik',
  'esri',
  'cyclosm',
  'thunderforest-opencyclemap',
  'memomaps-transport',
  'thunderforest-transport',
  'thunderforest-landscape',
  'thunderforest-outdoors',
  'waymarkedtrails-cycling',
  'waymarkedtrails-hiking',
]

export type RegionPath =
  | 'bibi'
  | 'trto'
  | 'berlin'
  | 'zes'
  | 'langerwehe'
  | 'deutschland'

// This is our regions "Database" until we have a real one
export const regions: Region[] = [
  {
    name: 'BiBi',
    fullName: 'Bietigheim-Bissingen',
    path: 'bibi',
    map: { lat: 48.95793, lng: 9.1395, zoom: 13 },
    bbox: {
      min: [9.0671, 48.9229],
      max: [9.1753, 48.9838],
    },
    logoPath: '/pageRegions/bibi-logo.svg',
    logoWhiteBackgroundRequired: false,
    themes: [
      // The order here specifies the order in the UI
      'fromTo',
      'bikelanes',
      'lit',
    ],
    osmUsers: [...adminIds],
    published: true,
    backgroundSources: defaultBackgroundSources,
  },
  {
    name: 'TrTo',
    fullName: 'Treptower Tollensewinkel',
    path: 'trto',
    map: { lat: 53.6774, lng: 13.267, zoom: 10.6 },
    bbox: {
      min: [12.9949, 53.5934],
      max: [13.4782, 53.8528],
    },
    logoPath: '/pageRegions/trto-logo.png',
    logoWhiteBackgroundRequired: true,
    themes: [
      // The order here specifies the order in the UI
      'bikelanes',
      'lit',
    ],
    osmUsers: [...adminIds],
    published: true,
    backgroundSources: defaultBackgroundSources,
  },
  {
    name: 'Berlin',
    fullName: 'Berlin Ring',
    path: 'berlin',
    map: { lat: 52.51, lng: 13.41, zoom: 14 },
    bbox: {
      min: [13.2809, 52.46],
      max: [13.4929, 52.5528],
    },
    logoPath: null,
    logoWhiteBackgroundRequired: false,
    themes: themes.map((t) => t.id).filter((t) => !t.endsWith('Zes')),
    osmUsers: [...adminIds, 12741863],
    published: false,
    backgroundSources: [
      ...defaultBackgroundSources,
      'strassenbefahrung',
      'alkis',
      'areal2022',
      'areal2021',
      'areal2020',
      'areal2019',
      'parkraumkarte_neukoelln',
    ],
  },
  {
    name: 'ZES+',
    fullName: 'ZES+',
    path: 'zes',
    map: { lat: 52.35, lng: 13.61, zoom: 12 },
    bbox: {
      min: [13.3579, 52.2095],
      max: [13.825, 52.4784],
    },
    logoPath: '/pageRegions/zesplus-logo.png',
    logoWhiteBackgroundRequired: false,
    themes: [
      // The order here specifies the order in the UI
      'fromToZes',
      'fromTo',
      'bikelanesZes',
      'bikelanes',
      'roadClassificationZes',
      'surfaceZes',
      'lit',
      'mapillary',
    ],
    osmUsers: [...adminIds],
    published: false,
    backgroundSources: defaultBackgroundSources,
  },
  {
    name: 'Langerwehe',
    fullName: 'Langerwehe',
    path: 'langerwehe',
    map: { lat: 50.82, lng: 6.37, zoom: 15 },
    // todo, needs the right bbox
    bbox: null,
    logoPath: null,
    logoWhiteBackgroundRequired: false,
    themes: themes.map((t) => t.id).filter((t) => !t.endsWith('Zes')),
    osmUsers: [...adminIds],
    published: false,
    backgroundSources: defaultBackgroundSources,
  },
  {
    name: 'Download',
    fullName: 'Deutschlandweiter Download',
    path: 'deutschland',
    map: { lat: 51.07, lng: 13.35, zoom: 5 },
    bbox: {
      min: [5.8663153, 47.2701114],
      max: [15.0419309, 55.099161],
    },
    logoPath: null,
    logoWhiteBackgroundRequired: false,
    themes: themes.map((t) => t.id).filter((t) => !t.endsWith('Zes')),
    osmUsers: [...adminIds],
    published: false,
    backgroundSources: [...defaultBackgroundSources],
  },
]
