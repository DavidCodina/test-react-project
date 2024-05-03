// Third-party imports
import { Fragment, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Custom imports
import { useThemeContext } from 'contexts'
import { Menu } from './components/Menu'
import { GlobalSpinner } from './components/GlobalSpinner'
import PageError from 'pages/PageError'

// This fallback was used just for testing lazy + preloading, but obviously
// you don't want a big dumb loading h1 every time something lazy loads.
const Fallback = () => {
  return (
    <div className='mx-auto w-full flex-1 p-6 2xl:container'>
      <h1 className='tex-6xl py-5 text-center font-black text-red-500'>
        Thinking...
      </h1>
    </div>
  )
}

/* ========================================================================
                              MainLayout
======================================================================== */

export const MainLayout = () => {
  const { mode } = useThemeContext()

  /* ======================
        handleError()
  ====================== */

  const handleError = (_error: any, _errorInfo: any) => {
    // This is where you'd call your logging service.
    // console.log('Error: ', error)
    // console.log('Error Info: ', errorInfo)
  }

  /* ======================
        handleReset()
  ====================== */

  const handleReset = () => {
    // console.log('handleReset() was called.')
  }

  /* ======================
          return
  ====================== */
  ///////////////////////////////////////////////////////////////////////////
  //
  // Initially, the top-level element was <Fragment>. However, once
  // the Tailwind theme (light/dark mode) was implemented, I needed
  // a place to conditionally set the background color and text color.
  //
  ///////////////////////////////////////////////////////////////////////////

  return (
    <Fragment>
      <ToastContainer
        autoClose={3000}
        theme={mode === 'dark' ? 'dark' : 'light'}
      />

      <div
        className={`flex w-full flex-1 transition-[background] duration-300 ease-linear dark:bg-[var(--tw-dark-body-color)] dark:text-[var(--tw-dark-text-color)]`}
      >
        <ErrorBoundary
          FallbackComponent={PageError}
          onError={handleError}
          onReset={handleReset}
        >
          <GlobalSpinner delay={750}>
            <Suspense fallback={<Fallback />}>
              <Outlet context={{ test: 'Outlet value!' }} />
            </Suspense>
          </GlobalSpinner>
        </ErrorBoundary>

        {/* For precedence, it's important that the <Menu /> comes after the other JSX. */}
        <Menu />
      </div>
    </Fragment>
  )
}

export default MainLayout
