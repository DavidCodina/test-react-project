import {
  useState,
  PropsWithChildren,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef
} from 'react'
import { useLocation, useHref } from 'react-router-dom'

import { useThrottle } from 'hooks'

export interface AppContextValue {
  setShowMenu: Dispatch<SetStateAction<boolean>>
  showMenu: boolean
  count: number
  setCount: Dispatch<SetStateAction<number>>
  prevPath: string
  currentPath: string
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

  const location = useLocation()
  const href = useHref(location)
  const [count, setCount] = useState(0) // Used to test rerender behavior.

  const prevPathRef = useRef('/')
  const currentPathRef = useRef('/')
  const [prevPath, setPrevPath] = useState('/')
  const [currentPath, setCurrentPath] = useState('/')

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    prevPathRef.current = currentPathRef.current
    currentPathRef.current = href
    setPrevPath(prevPathRef.current)
    setCurrentPath(currentPathRef.current)

    // console.log(
    //   `\n${JSON.stringify(
    //     {
    //       currentPath: currentPathRef.current,
    //       prevPath: prevPathRef.current
    //     },
    //     null,
    //     2
    //   )}\n`
    // )
  }, [href])

  /* ======================
          return
  ====================== */

  return (
    <AppContext.Provider
      value={{
        showMenu,
        setShowMenu,
        count,
        setCount,
        prevPath,
        currentPath
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
