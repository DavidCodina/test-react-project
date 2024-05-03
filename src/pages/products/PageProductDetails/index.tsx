// Third-party imports
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams
} from 'react-router-dom'

// Custom imports
import { useThemeContext } from 'contexts'
import { HR, Button } from 'components'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* =============================================================================
                                PageProductDetails 
============================================================================= */

const PageProductDetails = () => {
  // https://reactrouter.com/docs/en/v6/upgrading/v5#use-usenavigate-instead-of-usehistory
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  // https://reactrouter.com/docs/en/v6/api#usesearchparams
  // Will come back null if doesn't exist.
  // Shorthand: const productName = searchParams.get('name')
  const [searchParams, setSearchParams] = useSearchParams()

  const { mode } = useThemeContext()

  const productName = searchParams.get('name')

  // searchParams seems to be more or less the same as the standard URLSearchParams.
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  // As such, you can work with it in essentially the same way:
  //
  // const paramsObject = Array.from(searchParams.keys()).reduce(
  //   (acc, val) => ({ ...acc, [val]: searchParams.get(val) }),
  //   {}
  // )

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
            {params.id
              ? `Product ${params.id}${
                  location?.state?.productName
                    ? `: ${location.state.productName}`
                    : ''
                }`
              : 'Product Details'}
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            {params.id
              ? `Product ${params.id}${
                  location?.state?.productName
                    ? `: ${location.state.productName}`
                    : ''
                }`
              : 'Product Details'}
          </span>
        </h1>

        {/* Calling navigate(-1) will take the user back to the previous page.
      Here we are assuming that the previous page is actually ProductsListPage,
      but this may not necessarily be the case. For that reason it's really better
      to say something generic like 'Previous Page' or 'Go Back'. Conversely,
      if we ALWAYS wanted to go back to ProductsListPage then use '/products' instead. */}
        <Button
          className='btn-blue btn-sm mx-auto mb-6 block'
          onClick={() => navigate(-1)}
        >
          Previous Page
        </Button>

        <HR style={{ marginBottom: 50 }} />

        <article className='mb-6 rounded-lg border border-gray-500 bg-white p-3 text-sm'>
          <p className='mb-0'>
            Product name from <code>searchParams</code> not <code>params</code>:{' '}
            {productName ? (
              <strong className='font-bold text-blue-500'>{productName}</strong>
            ) : (
              <strong className='font-bold text-blue-500'>???</strong>
            )}
            . Again, passing non-sensitive, concise data is probably better done
            through <code>searchParams</code> because it potentially mitigates
            the issues of data not showing up in <code>location.state</code>{' '}
            when the user manually types/pastes in the URL string.
          </p>
        </article>

        <div className='mb-6 flex justify-center gap-4'>
          <Button
            onClick={() => {
              //# I don't want this to create a new entry in history.
              //# Instead I want it to replace it...............
              setSearchParams({ id: '999', name: 'Cocoa Crap Balls' })
            }}
            color='blue'
          >
            Change Search Params
          </Button>

          <Button
            onClick={() => {
              //# I don't want this to create a new entry in history.
              //# Instead I want it to replace it...............
              setSearchParams({})
            }}
            color='blue'
          >
            Clear Search Params
          </Button>
        </div>

        <article className='mb-6 rounded-lg border border-gray-500 bg-white p-3 text-sm'>
          <p>
            Obviously, this is a details page, but <code>searchParams</code> are
            commonly used when you need to apply filters to a listing page.
            Presumably, there would be a dataset (hardcoded or gotten from
            server) that then gets sliced up based on some{' '}
            <code>?filter=...</code>
          </p>

          <p className='mb-0'>
            Notice that changing/clearing the <code>searchParams</code>{' '}
            effectively changes the URL, which subsequently changes the page.
            Consequently, the <code>location.state.productName</code> is then
            lost.
          </p>
        </article>
      </div>
    </div>
  )
}

export default PageProductDetails
