import mapboxgl from 'mapbox-gl'
import { LegendIconTypes } from '../SelectLegend/LegendIcons'
import { TopicIds, TopicStyleFilterIds, TopicStyleIds } from './mapData.const'
import {
  SourceExportApiIdentifier,
  SourcesIds,
  SourceVerificationApiIdentifier,
} from './sourcesMapData'
import { MapDataThemeIds } from './themesMapData'

/** @desc: The background tiles, configured in 'sourcesBackgroundsRaster.const.ts' */
export type MapDataBackgroundSource<TIds> = {
  id: TIds
  name: string
  /** @desc URL of the vector tiles */
  tiles: string
  attributionHtml: string // TODO anzeigen in der Karte
  /** @desc Show link to the external legend of that map layer. Will replace {z}/{x}/{y} if present  */
  legendUrl?: string
  type?: mapboxgl.Source['type']
  minzoom?: mapboxgl.RasterSource['minzoom']
  maxzoom?: mapboxgl.RasterSource['maxzoom']
  tileSize?: mapboxgl.RasterSource['tileSize']
}

/** @desc: Our own vector tile layers configured in 'sources.const.ts' */
export type MapDataSource<TIds, TVerIds, TExpIds> = {
  id: TIds
  /** @desc Identifier for the verification API URL; verification is configured on the topic (`allowVerify`) */
  apiVerificationIdentifier?: TVerIds
  /** @desc Identifier for the export API URL; export is only allowed when present */
  apiExportIdentifier?: TExpIds
  /** @desc URL of the vector tiles */
  tiles: string
  attributionHtml: string // TODO anzeigen in der Karte
  licence?: 'ODbL'
  /** @desc A sorted list of keys that we officially document.
   * Keys of type `composit_*` require their own TableRowCell-Component.
   * Keys of type `*__if_present` are only presented if a value is present.
   * (Keys that are not mentioned here are for debugging only.) */
  documentedKeys?: (string | `composit_${string}` | `${string}__if_present`)[]
  /** @desc The key used by the highlighting LayerHighliht component to change the appearance of the selected element */
  highlightingKey: string
  /** @desc The `check_date:*=<Date>` key that that is used to calculate `is_fresh=<boolean>` */
  freshnessDateKey?: string
  minzoom?: mapboxgl.RasterSource['minzoom']
  maxzoom?: mapboxgl.RasterSource['maxzoom']
}

/** @desc: Top level thematik filter; usually one Theme has one primary Topic; eg. 'Radinfrastruktur, Quellen & Ziele, Stra??entypen' */
export type MapDataTheme = {
  id: MapDataThemeIds
  name: string
  desc?: string
  topics: MapDataThemeTopic[]
}

type MapDataThemeTopic = {
  id: TopicIds
  defaultActive: boolean
  // TODO: We might need to add a "mapOrder" value here to specify that "places" needs to be at the top on the map but at the bottom of the dropdown in the UI
}

/** @desc: Thematic "filter" on the raw vector tile data; eg. 'Radinfrastruktur, Oberfl??chen, Beleuchtung' */
export type MapDataTopic = {
  id: TopicIds
  name: string
  desc: string | null
  sourceId: SourcesIds
  allowVerify: boolean
  styles: MapDataStyle[]
}

/** @desc: Different visual views of the same thematic data; Can contain static filter, eg. "only lines with todos"); eg. 'Default,  Bad infrastructure (only)', 'Where debugging is needed' */
export type MapDataStyle = {
  id: TopicStyleIds
  name: string
  desc: null | string
  layers: MapDataVisLayer[]
  interactiveFilters: null | MapDataStyleInteractiveFilter[]
  legends?: null | MapDataStyleLegend[]
}

/** @desc: The technical glue between sources and styles. name fixed by library */
export type MapDataVisLayer = (
  | mapboxgl.CircleLayer
  | mapboxgl.FillLayer
  | mapboxgl.HeatmapLayer
  | mapboxgl.LineLayer
  | mapboxgl.SymbolLayer
) & {
  enableCalculator?: boolean
}

/** @desc: Optional interactive filter of the styled data; eg. 'by year' */
export type MapDataStyleInteractiveFilter = {
  id: TopicStyleFilterIds
  name: string
  desc?: string
  inputType: 'checkbox' | 'radiobutton'
  filterConfig: { lookupKey: string }
  options: MapDataStyleInteractiveFilterOption[]
}

/** @desc: Optional legend that allows filtering the given layer */
export type MapDataStyleLegend = {
  id: string
  name: string
  style:
    | {
        type: Exclude<LegendIconTypes, 'line'>
        color: string
        dasharray?: never
      }
    | {
        type: Extract<LegendIconTypes, 'line'>
        color: string
        dasharray?: number[]
      }
}

/** @desc: Options for the optional interactive filter of the styled data; eg. 'by year' */
export type MapDataStyleInteractiveFilterOption = {
  id: string
  name: string
  defaultActive?: boolean
}

export type MapData = {
  sources: MapDataSource<
    SourcesIds,
    SourceVerificationApiIdentifier,
    SourceExportApiIdentifier
  >[]
  themes: MapDataTheme[]
  topics: MapDataTopic[]
}
