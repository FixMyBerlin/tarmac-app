import { SourcesRasterIds } from '@components/MapInterface/mapData'
import { ContactPage, NotFoundPage, HomePage, PrivacyPage } from '@pages/index'
import {
  MakeGenerics,
  parseSearchWith,
  ReactLocation,
  Route,
  stringifySearchWith,
} from '@tanstack/react-location'
import { MapDataThemeIds } from '../components/MapInterface/mapData/themesMapData'
import { ThemeConfig } from '../components/MapInterface/mapStateConfig'

import { Region } from '@fakeServer/index'
import { decodeAndParse, encodeAndStringify } from './encodeDecode'
import { fetchRegions } from './fetchRegions'
import { fetchRegionByPath } from './utils/fetchRegionByPath'
import { PageRegionMap, PageRegions } from '@pages/PageRegions'

// LoaderData: LoaderData<unknown>;
// Params: Params<string>;
// Search: Search<unknown>;
// RouteMeta: RouteMeta<unknown>;
export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    regions: Region[]
    region: Region
  }
  Params: {
    regionPath: string
  }
  Search: {
    regionPathNotFound: string
    theme: MapDataThemeIds
    lat: number
    lng: number
    zoom: number
    bg: SourcesRasterIds
    config: ThemeConfig[]
  }
}>

export const location = new ReactLocation<LocationGenerics>({
  parseSearch: parseSearchWith((value) => decodeAndParse(value)),
  stringifySearch: stringifySearchWith((value) => encodeAndStringify(value)),
})

export const routes: Route<LocationGenerics>[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/regionen',
    children: [
      {
        path: '/',
        element: <PageRegions />,
        loader: async () => {
          return { regions: await fetchRegions() }
        },
      },
      {
        path: ':regionPath',
        children: [
          {
            path: '/',
            element: <PageRegionMap />,
            loader: async ({ params: { regionPath } }) => {
              return {
                region: await fetchRegionByPath(regionPath),
              }
            },
            // TODO figure out how to use the error-Handling to catch non-existing regionPath's
            // errorElement: <MapIndexPage regionPathNotFound />,
          },
          // {
          //   path: '/mitmachen',
          //   element: <PageRegionAction />,
          //   loader: async ({ params: { regionPath } }) => {
          //     return {
          //       region: await fetchRegionByPath(regionPath),
          //     }
          //   },
          // },
        ],
      },
    ],
  },
  // TODO Deactivated for now
  // {
  //   path: '/ueber',
  //   element: <AboutPage />,
  // },
  {
    path: '/kontakt',
    element: <ContactPage />,
  },
  {
    path: '/datenschutz',
    element: <PrivacyPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
