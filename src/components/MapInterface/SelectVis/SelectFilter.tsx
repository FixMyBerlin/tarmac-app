import React from 'react'
import { useStore } from 'zustand'
import { SelectEntryCheckbox } from '../components'
import { availableYears } from '../Map/unfallatlas/filterUnfallatlas'
import { cleanupTargetId } from '../Map/utils'
import { StoreSelectedFilters, useStoreMap } from '../store'

export const SelectFilter: React.FC = () => {
  const { selectedSources, selectedFilters, addFilter, removeFilter } =
    useStore(useStoreMap)
  const radioButtonScope = 'filter'

  const onChange = (event) => {
    const filterId = cleanupTargetId(event, radioButtonScope)
    console.log('onChange', {
      filterId,
      selectedFilters,
      trueRemove: selectedFilters.includes(filterId),
    })
    if (selectedFilters.includes(filterId)) {
      removeFilter(filterId)
    } else {
      addFilter(filterId)
    }
  }

  const filterIds = Object.keys(
    availableYears
  ) as StoreSelectedFilters['selectedFilters']

  const available = selectedSources.includes('unfallatlas')

  if (!available) return null

  return (
    <form onChange={onChange}>
      <h2 className="text-base font-medium text-gray-900">Filter</h2>
      <fieldset className="mt-4">
        <legend className="sr-only">Filter</legend>
        <div className="space-y-2.5">
          {filterIds.map((key) => {
            const { displayName } = availableYears[key]
            const active = selectedFilters.includes(key)
            // The filter list must have one entry, otherwise the map style fails
            // so we disable the last active one.
            const disabled = active && selectedFilters.length === 1
            return (
              <SelectEntryCheckbox
                scope={radioButtonScope}
                key={key}
                id={key}
                label={displayName}
                active={active}
                disabled={disabled}
              />
            )
          })}
        </div>
      </fieldset>
    </form>
  )
}
