// Third-party imports
import { render, screen } from '@testing-library/react'
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createMemoryRouter
} from 'react-router-dom'

// Custom imports
import { RootLayout, MainLayout } from 'layouts'
import { createMiniRouter } from 'utils'
import PagePosts /*, { LazyPagePosts, loader } */ from './index'

/* ======================
      mockLoader
====================== */
// Alternatively, use the actual loader and msw.

const mockLoader = () => {
  return {
    data: [
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      }
    ],
    success: true,
    message: 'Request success!',
    status: 200
  }
}

/* ========================================================================
                                Tests   
======================================================================== */

describe('PagePosts', () => {
  test("should render 'Testing 123...' (custom createMinRouter() utility)", async () => {
    const miniRouter = createMiniRouter({
      element: <PagePosts />, // No need to use LazyPagePosts for the test.
      loader: mockLoader // Better to use mockLoader rather than actual loader.
    })
    render(miniRouter)

    // Gotcha! This won't work:
    // const title = await screen.getByText('Testing 123...')
    // The reason is most likely because react-router-dom initializes
    // with some amount of state changes, which ultimately create an
    // asynchronous gap. This is not necessarily related to the loader,
    // or lazy loading.
    const title = await screen.findByText('Testing 123...')
    expect(title).toBeInTheDocument()
  })

  test("should render 'Testing 123...' (createMemoryRouter)", async () => {
    const routes = createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={<MainLayout />}>
          <Route path='/' loader={mockLoader} element={<PagePosts />} />
        </Route>
      </Route>
    )

    // https://reactrouter.com/en/main/routers/create-memory-router
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 0
    })

    render(<RouterProvider router={router} />)
    const title = await screen.findByText('Testing 123...')
    expect(title).toBeInTheDocument()
  })
})
