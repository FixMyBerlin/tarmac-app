import {
  updateVerificationStatus,
  VerificationApiGet,
  VerificationApiPost,
} from '@api/index'
import { buttonStyles } from '@components/Link'
import { extractSourceIdIdFromSourceKey } from '@components/MapInterface/Map/SourceAndLayers/utils/extractFromSourceKey'
import { getSourceData } from '@components/MapInterface/mapData'
import { useMapStateInteraction } from '@components/MapInterface/mapStateInteraction'
import { useUserStore } from '@components/MapInterface/UserInfo'
import { SmallSpinner } from '@components/Spinner/Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'

type Props = {
  sourceKey: string
  visible: boolean
  disabled: boolean
  osmId: number
  verificationStatus: string | undefined
}

export const VerificationActions: React.FC<Props> = ({
  sourceKey,
  visible,
  disabled,
  osmId,
  verificationStatus,
}) => {
  const queryClient = useQueryClient()
  const { addLocalUpdate, removeLocalUpdate } = useMapStateInteraction()

  const sourceData = getSourceData(
    extractSourceIdIdFromSourceKey(sourceKey.toString())
  )
  const apiIdentifier = sourceData?.apiVerificationIdentifier

  const { currentUser } = useUserStore()

  const apiData: VerificationApiPost = {
    type_name: apiIdentifier as string,
    osm_id: osmId,
    osm_type: 'W',
    verified_at: new Date().toISOString(),
    verified_by: currentUser?.id,
    verified_status: '*** needs to be set ***',
  }

  const queryKey = ['verificationHistory', apiData.osm_id]

  const mutation = useMutation({
    mutationFn: updateVerificationStatus,
    // When mutate is called:
    onMutate: async (queryParams) => {
      const { osm_id, osm_type, verified_at, verified_status } = queryParams
      const newHistoryItem: VerificationApiGet = {
        osm_id,
        osm_type,
        verified_at,
        verified_by: currentUser?.id,
        verified: verified_status,
      }

      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey })

      // Snapshot the previous value
      const previousHistory = queryClient.getQueryData(queryKey)

      // Optimistically update to the new value
      queryClient.setQueryData(
        queryKey,
        (data: undefined | { data: object }) => {
          const history = data?.data ? data.data : []
          return {
            // @ts-ignore will work
            data: [newHistoryItem, ...history],
          }
        }
      )

      addLocalUpdate(newHistoryItem)

      // Return a context object with the snapshotted value
      return { previousHistory, newHistoryItem }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.previousHistory)
        removeLocalUpdate(context.newHistoryItem)
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
  })

  const verifiedOnce =
    verificationStatus && ['approved', 'rejected'].includes(verificationStatus)

  const ApproveButton = ({ children }: { children: React.ReactNode }) => {
    if (verifiedOnce && verificationStatus === 'approved') return null
    return (
      <button
        onClick={() => {
          mutation.mutate({ ...apiData, verified_status: 'approved' })
        }}
        disabled={mutation.isLoading || disabled}
        className={classNames(
          buttonStyles,
          'bg-white py-1 px-3',
          disabled
            ? 'cursor-not-allowed border-gray-300 text-gray-400 shadow-sm hover:bg-white'
            : 'border-gray-400 shadow-md'
        )}
      >
        {children}
      </button>
    )
  }

  const RejectButton = ({ children }: { children: React.ReactNode }) => {
    if (verifiedOnce && verificationStatus === 'rejected') return null
    return (
      <button
        onClick={() => {
          mutation.mutate({ ...apiData, verified_status: 'rejected' })
        }}
        disabled={mutation.isLoading || disabled}
        className={classNames(
          buttonStyles,
          'bg-white py-1 px-3',
          disabled
            ? 'cursor-not-allowed border-gray-300 text-gray-400 shadow-sm hover:bg-white'
            : 'border-gray-400 shadow-md'
        )}
      >
        {children}
      </button>
    )
  }

  if (!visible) return null

  return (
    <div
      className={classNames('mb-4', {
        'flex items-center justify-between': verifiedOnce,
      })}
    >
      <h4 className="mb-2 font-semibold text-gray-600">
        Prüf-Status {verifiedOnce ? 'ändern' : 'eintragen'}
      </h4>
      {disabled && (
        <div className="mb-2">
          Ein Status kann nur eingetragen werden, wenn die Primärdaten
          vorliegen.
        </div>
      )}
      <div className="space-x-2">
        {mutation.isLoading && <SmallSpinner />}
        <ApproveButton>
          {verifiedOnce ? 'Daten richtig' : 'Richtig'}
        </ApproveButton>
        <RejectButton>Überarbeitung nötig</RejectButton>
      </div>
    </div>
  )
}