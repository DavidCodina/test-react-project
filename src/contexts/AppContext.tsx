import {
  useState,
  PropsWithChildren,
  createContext,
  useContext,
  SetStateAction,
  Dispatch
} from 'react'

import { useThrottle } from 'hooks'

export interface AppContextValue {
  setShowMenu: Dispatch<SetStateAction<boolean>>
  showMenu: boolean

  // [key: string]: any
}

const throttleDuration = 200

/* ========================================================================

======================================================================== */

export const AppContext = createContext({} as AppContextValue)
export const AppConsumer = AppContext.Consumer

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [_showMenu, setShowMenu] = useState(false)
  const showMenu = useThrottle(_showMenu, throttleDuration) as boolean

  /* ======================
          return
  ====================== */

  return (
    <AppContext.Provider
      value={{
        showMenu,
        setShowMenu
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const value = useContext(AppContext)
  return value
}
