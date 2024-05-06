// Third-party imports
import { useState, useEffect } from 'react'
import { useNavigation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

/* ========================================================================
                              GlobalSpinnner
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Pending UI:  https://reactrouter.com/en/main/start/overview#pending-navigation-ui
// Skeleton UI: https://reactrouter.com/en/main/start/overview#skeleton-ui-with-suspense
//
// Another approach that can be used instead of rendering a spinner is to use
// defer/Await. See Academind video at 35:30 : https://www.youtube.com/watch?v=L2kzUg6IzxM
//
///////////////////////////////////////////////////////////////////////////

export const GlobalSpinner = ({
  children,
  delay = 0
}: {
  children: JSX.Element // Don't use React.ReactNode here.
  delay?: number
}) => {
  const navigation = useNavigation()

  const navigationState = navigation.state
  const [showSpinner, setShowSpinner] = useState(false)

  /* ======================
        useEffect()
  ====================== */
  // Because it's annoying to see a momentary spinner, it's
  // better to wait at least 500ms before showing it.
  // One thing you don't want is for the

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (navigationState === 'loading') {
      timeout = setTimeout(() => {
        setShowSpinner(true)
      }, delay)
    }

    // Make sure to prevent the spinner from rendering
    // AFTER the component has already loaded.
    return () => {
      clearTimeout(timeout)
      setShowSpinner(false)
    }
  }, [delay, navigationState])

  /* ======================
        renderSpinner()
  ====================== */

  const renderSpinner = () => {
    if (showSpinner) {
      return (
        <div className='mx-auto flex w-screen flex-1 justify-center pt-32 2xl:container'>
          <FontAwesomeIcon
            className='text-6xl text-blue-500'
            icon={faSpinner}
            spin
          />
        </div>
      )
    }
    return children
  }

  return renderSpinner()
}

/* ========================================================================
                            FixedGlobalSpinnner
======================================================================== */

export const FixedGlobalSpinner = ({ delay = 0 }: { delay?: number }) => {
  const navigation = useNavigation()

  const navigationState = navigation.state
  const [showSpinner, setShowSpinner] = useState(false)

  /* ======================
        useEffect()
  ====================== */
  // Because it's annoying to see a momentary spinner, it's
  // better to wait at least 500ms before showing it.
  // One thing you don't want is for the

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (navigationState === 'loading') {
      timeout = setTimeout(() => {
        setShowSpinner(true)
      }, delay)
    }

    // Make sure to prevent the spinner from rendering
    // AFTER the component has already loaded.
    return () => {
      clearTimeout(timeout)
      setShowSpinner(false)
    }
  }, [delay, navigationState])

  /* ======================
        renderSpinner()
  ====================== */

  const renderSpinner = () => {
    if (showSpinner) {
      return (
        <div className='fixed inset-0'>
          <div
            className='absolute'
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)'
            }}
          >
            <FontAwesomeIcon
              className='text-6xl text-blue-500'
              icon={faSpinner}
              spin
            />
          </div>
        </div>
      )
    }
    return null
  }

  return renderSpinner()
}
