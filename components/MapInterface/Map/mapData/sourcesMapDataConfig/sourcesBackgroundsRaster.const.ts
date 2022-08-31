import { MapDataConfigSource } from '../types'

export type MapDataConfigSourcesRasterIds =
  | 'default'
  | 'strassenbefahrung'
  | 'alkis'
  | 'mapnik'
  | 'esri'
  | 'areal2022'
  | 'areal2021'
  | 'areal2020'
  | 'areal2019'
  | 'parkraumkarte_neukoelln'

export const sourcesBackgroundsRaster: MapDataConfigSource<MapDataConfigSourcesRasterIds>[] =
  [
    {
      id: 'strassenbefahrung',
      name: 'Straßenbefahrung 2014',
      type: 'raster',
      tiles:
        'https://mapproxy.codefor.de/tiles/1.0.0/strassenbefahrung/mercator/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=k_StraDa@senstadt&type=WMS">Geoportal Berlin / Straßenbefahrung 2014</a>',
    },
    {
      id: 'alkis',
      name: 'Alkis',
      type: 'raster',
      tiles:
        'https://mapproxy.codefor.de/tiles/1.0.0/alkis_30/mercator/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=k_StraDa@senstadt&type=WMS">Geoportal Berlin / Straßenbefahrung 2014</a>',
    },
    {
      id: 'mapnik',
      name: 'OpenStreetMap Carto',
      type: 'raster',
      tiles: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      id: 'esri',
      name: 'Esri',
      type: 'raster',
      tiles:
        'https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a href="https://wiki.openstreetmap.org/wiki/Esri">Terms & Feedback</a>',
    },
    // This is the version from https://github.com/openstreetmap/iD/blob/HEAD/data/manual_imagery.json
    // More: https://github.com/osmlab/editor-layer-index/issues/1451#issuecomment-1057938706
    // maxar_tiles: {
    //   name: 'Maxar',
    //   // type: 'raster',
    //   scheme: 'tms', // `{-y}` in Leaflet https://maplibre.org/maplibre-gl-js-docs/style-spec/sources/#raster-scheme
    //   tiles: [
    //     'https://services.digitalglobe.com/earthservice/tmsaccess/tms/1.0.0/DigitalGlobe:ImageryTileService@EPSG:3857@jpg/{z}/{x}/{y}.jpg?connectId=c2cbd3f2-003a-46ec-9e46-26a3996d6484',
    //   ,
    //   tileSize: 256,
    //   minzoom: 10,
    //   maxzoom: 21,
    //   attribution:
    //     "<a href='https://wiki.openstreetmap.org/wiki/DigitalGlobe'>Terms & Feedback</a>",
    // },
    {
      id: 'areal2022',
      name: 'Luftbilder 2022',
      type: 'raster',
      tiles: 'https://tiles.codefor.de/berlin-2022-dop20rgbi/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=a_luftbild2022_true_rgbi@senstadt&type=FEED">Geoportal Berlin / Digitale farbige TrueOrthophotos 2022 (DOP20RGBI)</a>',
    },
    {
      id: 'areal2021',
      name: 'Luftbilder 2021',
      type: 'raster',
      tiles: 'https://tiles.codefor.de/berlin-2021-dop20rgbi/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=a_luftbild2021_rgb@senstadt&type=FEED">Geoportal Berlin / Digitale farbige Orthophotos 2021 (DOP20RGBI)</a>',
    },
    {
      id: 'areal2020',
      name: 'Luftbilder 2020',
      type: 'raster',
      tiles: 'https://tiles.codefor.de/berlin-2020-dop20rgb/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=a_luftbild2020_rgb@senstadt&type=FEED">Geoportal Berlin / Digitale farbige Orthophotos 2020 (DOP20RGB)</a>',
    },
    {
      id: 'areal2019',
      name: 'Luftbilder 2019',
      type: 'raster',
      tiles: 'https://tiles.codefor.de/berlin-2019-dop20rgb/{z}/{x}/{y}.png',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 21,
      attributionHtml:
        '<a target="_blank" href="https://fbinter.stadt-berlin.de/fb/berlin/service.jsp?id=a_luftbild2019_rgb@senstadt&type=FEED">Geoportal Berlin / Digitale farbige Orthophotos 2019 (DOP20RGB)</a>',
    },
    {
      id: 'parkraumkarte_neukoelln',
      name: 'Parkraumkarte Neukoelln',
      type: 'raster',
      tiles: 'https://tiles.osm-berlin.org/parkraumkarte/{z}/{x}/{y}.jpg',
      tileSize: 256,
      minzoom: 10,
      maxzoom: 14,
      attributionHtml:
        '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>, Bordsteinkanten: OpenStreetMap und Geoportal Berlin / ALKIS.',
    },
    // Docs https://docs.mapbox.com/api/maps/static-tiles/
    // Edit Style https://studio.mapbox.com/styles/hejco/ckz8bsqbq000t15nz6ok45bid/edit/#15.61/52.495655/13.417375
    // TODO Lizenz / Attribution
    // About Quota: Make sure we only pull data where avaliable and only for zoom level that are usefull.
    //  Quota at: https://account.mapbox.com/
    //  Docs: https://docs.mapbox.com/api/maps/static-tiles/#manage-static-tiles-api-costs
    // xhainGutachten_tiles: {
    //   name: 'Parkraumgutachten Xhain',
    // type: 'raster',
    //   tiles: 'https://api.mapbox.com/styles/v1/hejco/ckz8bsqbq000t15nz6ok45bid/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q',
    //   ,
    //   tileSize: 512,
    //   minzoom: 18, // Quota
    //   maxzoom: 21,
    //   //     bounds: L.latLngBounds(L.latLng(52.5310256, 13.4914434), L.latLng(52.4827923, 13.3682291)), // Quota (outside no data is loaded for this layer)
    //   attribution:
    //     'Daten der Parkraumgutachten der Bezirksverwaltung. OpenData. Lizenz TODO.',
    // },
  ]