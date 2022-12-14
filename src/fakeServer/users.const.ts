type User = {
  id: number
  displayName: string
  isAdmin: boolean
}

// This is our users "Database" until we have a real one
// Note: If the 'whosthat' does not work, one can find the user on the OSM user page => Link "Report this User" => "reportable_id"
export const users: User[] = [
  {
    // http://whosthat.osmz.ru/?q=boooshii
    id: 9142806,
    displayName: 'boooshii',
    isAdmin: true,
  },
  {
    // http://whosthat.osmz.ru/?q=tordans
    id: 11881,
    displayName: 'tordans',
    isAdmin: true,
  },
  {
    // http://whosthat.osmz.ru/?q=elsueno
    id: 17391407,
    displayName: 'elsueno',
    isAdmin: true,
  },
  {
    // http://whosthat.osmz.ru/?q=Henri97
    id: 155680,
    displayName: 'Henri97',
    isAdmin: true,
  },
  {
    // http://whosthat.osmz.ru/?q=hejco
    id: 7302664,
    displayName: 'hejco',
    isAdmin: true,
  },
  {
    // http://whosthat.osmz.ru/?q=BAFK_St
    // Bezirksamt Xhain
    id: 12741863,
    displayName: 'BAFK_St',
    isAdmin: false,
  },
]
