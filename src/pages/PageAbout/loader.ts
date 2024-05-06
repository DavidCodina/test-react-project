// import { lazy } from 'react'
import { lazyWithPreload, sleep } from 'utils'

///////////////////////////////////////////////////////////////////////////
//
// If you use this implementation, you will see the GlobalSpinner, then the Suspense fallback.
// export const LazyPageAbout = lazy(async () => {
//   await sleep(3000)
//   return import('./')
// })
// export const loader = async () => {
//   await sleep(3000)
//   return null
// }
//
///////////////////////////////////////////////////////////////////////////

export const LazyPageAbout = lazyWithPreload(() => {
  return import('./')
})

export const loader = async () => {
  await sleep(3000)
  await LazyPageAbout.preload().then((component: any) => {
    return component
  })
  return null
}
