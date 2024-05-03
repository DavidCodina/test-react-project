// Third-party imports
import {
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouteProps
} from 'react-router-dom'

// See also:
// https://testing-library.com/docs/react-testing-library/setup/

// Custom imports
import { RootLayout, MainLayout } from 'layouts'

type RoutePropsWithoutPath = Omit<RouteProps, 'path'>

export const mockLoader = async () => {
  return {
    data: { test: 'Testing 123...' },
    success: true,
    message: 'Request success!',
    status: 200
  }
}

// Very important: See setupTests.ts for matchMedia
// mock that createMiniRouter depends on.
export const createMiniRouter = (props: RoutePropsWithoutPath) => {
  const routeProps = props as RouteProps

  const routes = createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<MainLayout />}>
        <Route path='/' {...routeProps} />
      </Route>
    </Route>
  )

  const router = createMemoryRouter(routes)
  const minRouter = <RouterProvider router={router} />
  return minRouter
}
