import { lazyWithPreload /* , sleep  */ } from 'utils'
export const LazyPageAbout = lazyWithPreload(() => import('./'))

export const loader = async () => {
  await LazyPageAbout.preload().then((component: any) => {
    return component
  })
  return null
}
