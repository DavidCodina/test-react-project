// Third-party imports
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Custom imports
import { useThemeContext } from 'contexts'
import { HR } from 'components'
export * from './loader'

const mockProductListData = [
  { id: '1', name: 'Captain Krunk Berries' },
  { id: '2', name: 'Frosted Hemp Nuggs' },
  { id: '3', name: 'Burnt Cinnamon Toast Crunch' }
]

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* =============================================================================
                                  PageProductList
============================================================================= */

const PageProductList = () => {
  const navigate = useNavigate()
  const { mode } = useThemeContext()

  const [products, setProducts] = useState<{ id: string; name: string }[]>()

  /* ======================
      renderProducts()
  ====================== */

  const renderProducts = () => {
    if (
      !Array.isArray(products) ||
      (Array.isArray(products) && products.length === 0)
    ) {
      return null
    }

    return (
      <ul
        className='mx-auto overflow-hidden rounded-xl border border-gray-500'
        style={{ maxWidth: 500 }}
      >
        {Array.isArray(products) &&
          products.map((product) => {
            return (
              <li
                className='border-b border-gray-500 last:border-none'
                key={product.id}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className='bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
                  //# Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events)
                  onKeyDown={(_e) => {
                    // console.log(e)
                  }}
                  // onClick={() => navigate(`/products/${product.id}`)}
                  onClick={() => {
                    // It's also possible to pass additional state data in the second argument of navigate()
                    //
                    // navigate(`/products/${product.id}/?name=${product.name}`, {
                    //   state: {
                    //     productName: product.name
                    //   }
                    // })
                    //
                    // This can be accessed in the next page using const location = useLocation() & location.state
                    //
                    // <Title as='h2' className='mb-5 text-white-3d text-center'>
                    //   {params.id ? `Product ${params.id}${location?.state?.productName ? `: ${location.state.productName}`: ''}`
                    //   : 'Product Details'}
                    // </Title>
                    //
                    // The downside to this approach is that if the user navigates to the page manually, that data
                    // will not be available, and if the other page is not sufficiently careful in conditionally
                    // rendering that data, it could end up causing an error.
                    //
                    // Data can also be included in the URL string using searchParams.
                    // Thus, assuming the data is not sensitive and not excessively long, then
                    // another option is to pass a search parameter in the URL (i.e., a query string).
                    // This has the advantage of potentially mitigating the previous issue. Why?
                    // Because it's possible that the user originally got the URL string by navigating
                    // through the app, and is now simply cut and pasting or using a bookmarked link, etc.
                    // This means that the search parameter is probably still baked into their URL.
                    //
                    // Notice how '/' is prepended before '?id='. Even if we omitted it,
                    // React Router will add it back in...
                    navigate(
                      `/products/${product.id}/?id=${product.id}&name=${product.name}`,
                      {
                        state: {
                          productName: product.name
                        }
                      }
                    )
                  }}
                  role='button'
                  tabIndex={0}
                >
                  {/* You could use <Link /> but, I often prefer navigating programmatically.
                  <Link to={`/products/${product.id}`}>{product.name}</Link> */}
                  {product.name}
                </div>
              </li>
            )
          })}
      </ul>
    )
  }

  /* ======================
        useEffect()
  ====================== */
  // On mount, make an API call to get products...

  useEffect(() => {
    setProducts(mockProductListData)
  }, [])

  /* ======================
          return
  ====================== */

  return (
    <div
      className={`
    mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      {/* <Waves /> */}

      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative' }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Product List
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Product List
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        {renderProducts()}
      </div>
    </div>
  )
}

export default PageProductList
