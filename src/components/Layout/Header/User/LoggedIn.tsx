import { useMapStateInteraction } from '@components/MapInterface/mapStateInteraction'
import { User } from '@components/MapInterface/UserInfo'
import { isAdmin } from '@fakeServer/utils'
import { Menu, Transition } from '@headlessui/react'
import { CheckBadgeIcon, UserIcon } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import React, { Fragment } from 'react'

type Props = {
  user: User
  hasPermissions: boolean
  onLogout: () => void
}

export const LoggedIn: React.FC<Props> = ({
  user,
  hasPermissions,
  onLogout,
}) => {
  const { showDebugInfo } = useMapStateInteraction()
  const showUserId = isAdmin(user) && showDebugInfo
  const imgSrc = user.avatar ? user.avatar : null

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex rounded-full bg-gray-800 text-sm hover:ring-1 hover:ring-gray-500 hover:ring-offset-2 hover:ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only">User-Menü</span>
        {imgSrc ? (
          <img
            className="h-8 w-8 rounded-full"
            src={imgSrc}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <UserIcon className="h-6 w-6 text-gray-300" aria-hidden="true" />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700">
            <p className="mb-1">
              <strong>Angemeldet als {user.displayName}</strong>
            </p>
            {hasPermissions ? (
              <div className="flex items-center gap-1 text-xs leading-4">
                <CheckBadgeIcon className="inline-block h-6 w-6" />
                <span>Sie sind Mitarbeiter dieser Region</span>
              </div>
            ) : (
              <div className="text-xs leading-4">
                Sie haben zur Zeit keine Zugriffsrechte in dieser Region.
              </div>
            )}
          </div>
          {showUserId && (
            <div className="bg-pink-300 px-4 py-2 text-sm">
              OSM ID {user.id}
            </div>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onLogout}
                className={clsx(
                  active ? 'bg-gray-100' : '',
                  'w-full px-4 py-2 text-left text-sm text-gray-700'
                )}
              >
                Ausloggen
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
