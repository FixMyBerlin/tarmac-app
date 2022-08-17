import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import React, { useState } from 'react'
import {
  Map as MapGl,
  MapboxGeoJSONFeature,
  NavigationControl,
} from 'react-map-gl'
import { useStore } from 'zustand'
import { SourcesLayerRasterBackgrounds } from './backgrounds'
import { useStoreMap } from '../store/useStoreMap'
import { SourcesParkingLanes } from './parkingLanes'
import { SourcesBoundaries } from './boundaries'
import { SourcesUnfallatlas } from './unfallatlas'

// const GATSBY_MAPTILER_KEY = process.env.GATSBY_MAPTILER_KEY

export const Map: React.FC = () => {
  const interactiveLayerIds = ['vts_pl', 'vts_pl_no', 'vts_pl_all_other']

  const [cursorStyle, setCursorStyle] = useState('grab')
  const {
    setInspector,
    addToCalculator,
    removeFromCalculator,
    calculatorFeatures,
  } = useStore(useStoreMap)

  const handleMouseEnter = (event) => {
    setCursorStyle('pointer')
    // handleInspect(event)
    setInspector(event.features)
  }
  const handleMouseLeave = (_event) => {
    setCursorStyle('grab')
  }
  const handleClick = (event) => {
    const features = event.features as MapboxGeoJSONFeature[]
    const alreadySelectedIds = calculatorFeatures.map((f) => f.properties.id)
    features.forEach((f) => {
      if (alreadySelectedIds.includes(f.properties.id)) {
        removeFromCalculator(f)
      } else {
        addToCalculator([f])
      }
    })
  }
  // Just for debugging
  const handleLoad = (event) => {
    const allLayer = event.target.getStyle().layers
    const basemapLayer = allLayer.filter((l) => l.source === 'openmaptiles')
    const ourLayer = allLayer.filter((l) => l.source !== 'openmaptiles')
    console.log('onLoad', { event, ourLayer, basemapLayer })
  }

  return (
    <MapGl
      id="mainMap"
      initialViewState={{
        longitude: 13.4381,
        latitude: 52.47928,
        zoom: 16,
      }}
      hash
      style={{ width: '100%', height: 800 }}
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/basic/style.json?key=ECOoUBmpqklzSCASXxcu"
      interactiveLayerIds={interactiveLayerIds}
      // onMouseMove={}
      // onLoad={handleInspect}
      cursor={cursorStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onLoad={handleLoad}
    >
      <SourcesParkingLanes />
      <SourcesBoundaries />
      <SourcesUnfallatlas />
      <SourcesLayerRasterBackgrounds />
      <NavigationControl showCompass={false} />
      {/* <GeolocateControl /> */}
      {/* <ScaleControl /> */}
    </MapGl>
  )
}
