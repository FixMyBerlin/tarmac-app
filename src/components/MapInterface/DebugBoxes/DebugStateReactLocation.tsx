import { useMapStateInteraction } from '@components/MapInterface/mapStateInteraction'
import { useMatch, Link } from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools'
import React from 'react'

export const DebugStateReactLocation: React.FC = () => {
  const {
    params: { regionPath },
  } = useMatch()
  const { showDebugInfo, setShowDebugInfo } = useMapStateInteraction()

  if (!showDebugInfo) return null

  return (
    <>
      <div className="absolute bottom-3 right-12 z-10 max-h-screen max-w-[60%] space-y-0.5 overflow-y-auto rounded bg-pink-300 px-2 py-2 text-[10px] shadow-xl">
        <button
          className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border bg-purple-500/90 hover:bg-purple-800 hover:text-purple-200"
          onClick={() => setShowDebugInfo(false)}
        >
          &times;
        </button>
        {!!regionPath && (
          <Link to={`/regionen/${regionPath}`} className="rounded border p-1">
            Reset URL <code>config</code>
          </Link>
        )}
        <ReactLocationDevtools
          initialIsOpen={false}
          position="bottom-right"
          toggleButtonProps={{ style: { position: 'relative', margin: 0 } }}
        />
      </div>
    </>
  )
}
