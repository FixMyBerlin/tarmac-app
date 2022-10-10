import { MapDataConfigStyleInteractiveFilter } from '@components/MapInterface/mapData'
import { TopicStyleFilterConfig } from '@components/MapInterface/store'
import { filterArrayFromMergedDataAndConfig } from './filterArrayFromMergedDataAndConfig'
import { flattenFilterArrays } from './flattenFilterArrays'
import { mergeFilterDataWithConfigState } from './mergeFilterDataWithConfigState'
import { wrapFilterWithAll } from './wrapFilterWithAll'

export const specifyFilters = (
  layerFilter: undefined | any[],
  filtersData: undefined | null | MapDataConfigStyleInteractiveFilter[],
  filtersConfig: undefined | null | TopicStyleFilterConfig[]
) => {
  if (!filtersData || !filtersConfig) {
    return wrapFilterWithAll(layerFilter)
  }

  const filterDataAndConfig = mergeFilterDataWithConfigState(
    filtersData,
    filtersConfig
  )
  const filtersArray = filterDataAndConfig.map((f) =>
    filterArrayFromMergedDataAndConfig(f)
  )
  const mergedFiltersArray = flattenFilterArrays(layerFilter, filtersArray)
  return wrapFilterWithAll(mergedFiltersArray)
}